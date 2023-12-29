package com.carrental.userservice.service.impl;

import com.carrental.commons.authentication.config.jwt.JwtProperties;
import com.carrental.commons.authentication.exception.AuthorizationException;
import com.carrental.commons.authentication.model.AuthenticatedUser;
import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import com.carrental.commons.authentication.utils.JWTTokenUtils;
import com.carrental.commons.utils.filtering.FilterSpecificationBuilder;
import com.carrental.userservice.config.properties.UserServiceProperties;
import com.carrental.userservice.exception.IncorrectPasswordException;
import com.carrental.userservice.exception.UserAlreadyExistException;
import com.carrental.userservice.model.dto.*;
import com.carrental.userservice.model.entity.UserEntity;
import com.carrental.userservice.model.entity.UserRoleEntity;
import com.carrental.userservice.repository.UserRepository;
import com.carrental.userservice.repository.UserRoleRepository;
import com.carrental.userservice.service.UserService;
import com.google.common.net.HttpHeaders;
import org.modelmapper.ModelMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.format.DateTimeFormatter;
import java.util.*;
import java.util.stream.Collectors;

public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final UserRoleRepository userRoleRepository;

    private final AuthenticatedUserDataService authenticatedUserDataService;

    private final ModelMapper modelMapper;

    private final PasswordEncoder passwordEncoder;

    private final RabbitTemplate rabbitTemplate;

    private final FilterSpecificationBuilder<UserEntity> filterSpecificationBuilder;

    private final JwtProperties jwtProperties;

    private final UserServiceProperties userServiceProperties;

    public UserServiceImpl(
            UserRepository userRepository,
            UserRoleRepository userRoleRepository,
            AuthenticatedUserDataService authenticatedUserDataService,
            ModelMapper modelMapper,
            PasswordEncoder passwordEncoder,
            RabbitTemplate rabbitTemplate,
            FilterSpecificationBuilder<UserEntity> filterSpecificationBuilder,
            JwtProperties jwtProperties,
            UserServiceProperties userServiceProperties
    ) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.authenticatedUserDataService = authenticatedUserDataService;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
        this.rabbitTemplate = rabbitTemplate;
        this.filterSpecificationBuilder = filterSpecificationBuilder;
        this.jwtProperties = jwtProperties;
        this.userServiceProperties = userServiceProperties;
    }

    @Override
    public UserResponseDTO getUserById(Long userId) throws NoSuchElementException {
        return modelMapper.map(userRepository.findById(userId).orElseThrow(), UserResponseDTO.class);
    }

    @Override
    public UsersEmailsResponseDTO getAllUsersEmailsByIds(List<Long> userIds) {
        UsersEmailsResponseDTO usersEmailsResponseDTO = new UsersEmailsResponseDTO();
        usersEmailsResponseDTO.setEmails(userRepository.findAllEmailsByUserIdIn(userIds));
        return usersEmailsResponseDTO;
    }

    @Override
    public Page<UserResponseDTO> getUsers(Pageable pageable, String filterString) throws IllegalArgumentException {
        Specification<UserEntity> spec = filterSpecificationBuilder.build(filterString);
        Page<UserEntity> userEntityPage = userRepository.findAll(spec, pageable);
        List<UserResponseDTO> userResponseDTOList = userEntityPage
                .getContent()
                .stream()
                .map(userEntity -> modelMapper.map(userEntity, UserResponseDTO.class))
                .collect(Collectors.toList());
        return new PageImpl<>(userResponseDTOList, pageable, userEntityPage.getTotalElements());
    }

    @Override
    public UsersEmailsResponseDTO getAllUsersEmails() {
        UsersEmailsResponseDTO usersEmailsResponseDTO = new UsersEmailsResponseDTO();
        usersEmailsResponseDTO.setEmails(userRepository.findAllEmails());
        return usersEmailsResponseDTO;
    }

    @Override
    public UsersEmailsResponseDTO sendEmailsToMultipleRecipients(MultipleRecipientsMailsDTO multipleRecipientsMailsDTO) {
        rabbitTemplate.convertAndSend(userServiceProperties.getSendMultipleEmailsQueue(), multipleRecipientsMailsDTO);
        UsersEmailsResponseDTO usersEmailsResponseDTO = new UsersEmailsResponseDTO();
        usersEmailsResponseDTO.setEmails(multipleRecipientsMailsDTO.getRecipients());
        return usersEmailsResponseDTO;
    }

    @Override
    public UserResponseDTO addRolesToUser(Long userId, List<RoleAddDTO> roleAddDTOs) throws NoSuchElementException {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow();
        Set<UserRoleEntity> userRolesEntityToAddList = roleAddDTOs
                .stream()
                .map(userRole -> userRoleRepository.findById(userRole.getRoleId()).orElseThrow())
                .collect(Collectors.toSet());
        userEntity.setRoles(userRolesEntityToAddList);
        return modelMapper.map(userRepository.save(userEntity), UserResponseDTO.class);
    }

    @Override
    public UserResponseDTO updateUser(Long userId, UserUpdateDTO userUpdateDTO) throws NoSuchElementException {
        UserEntity userEntityToUpdate = userRepository.findById(userId).orElseThrow();
        modelMapper.map(userUpdateDTO, userEntityToUpdate);
        userEntityToUpdate.setId(userId);
        UserEntity userEntityAfterUpdate = userRepository.save(userEntityToUpdate);
        return modelMapper.map(userEntityAfterUpdate, UserResponseDTO.class);
    }

    @Override
    public UserResponseDTO createUser(CreateUserDTO createUserDTO) throws UserAlreadyExistException {
        validateUser(createUserDTO);

        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(createUserDTO.getEmail());
        userEntity.setPassword(passwordEncoder.encode(createUserDTO.getPassword()));
        userEntity.setName(createUserDTO.getFirstName());
        userEntity.setSurname(createUserDTO.getLastName());
        userEntity.setBirthDate(createUserDTO.getBirthDate());
        userEntity.setPhone(createUserDTO.getPhone());
        userEntity.setRoles(Collections.emptySet());

        return modelMapper.map(userRepository.save(userEntity), UserResponseDTO.class);
    }

    @Override
    public UserResponseDTO updateUserPassword(PasswordUpdateDTO passwordUpdateDTO) throws IncorrectPasswordException, NoSuchElementException {
        AuthenticatedUser authenticatedUser = authenticatedUserDataService.getAuthenticatedUserData();
        UserEntity userEntity = userRepository.findById(authenticatedUser.getUserId()).orElseThrow();
        boolean isCurrentPasswordCorrect = passwordEncoder.matches(passwordUpdateDTO.getCurrentPassword(), userEntity.getPassword());
        if (!isCurrentPasswordCorrect) {
            throw new IncorrectPasswordException("Given current password is not correct.");
        }
        userEntity.setPassword(passwordEncoder.encode(passwordUpdateDTO.getNewPassword()));
        return modelMapper.map(userRepository.save(userEntity), UserResponseDTO.class);
    }

    private void validateUser(CreateUserDTO createUserDTO) throws UserAlreadyExistException {
        validateUserEmail(createUserDTO.getEmail());
    }

    private void validateUserEmail(String emailOfUserToCreate) throws UserAlreadyExistException {
        UserEntity userWithGivenEmail = userRepository.findByEmail(emailOfUserToCreate).orElse(null);
        if (userWithGivenEmail != null) {
            throw new UserAlreadyExistException("User with given email already exists");
        }
    }

    @Override
    public UserResponseDTO enableUser(Long userId, String token) throws NoSuchElementException {
        UserEntity userEntityToUpdate = userRepository.findById(userId).orElseThrow(NoSuchElementException::new);
        userEntityToUpdate.setEnabled(true);
        UserEntity userEntityAfterUpdate = userRepository.save(userEntityToUpdate);
        rabbitTemplate.convertAndSend(userServiceProperties.getDeleteTokenQueue(), token);
        return modelMapper.map(userEntityAfterUpdate, UserResponseDTO.class);
    }

    @Override
    public UserDetailsDTO getUserByEmail(String email) throws NoSuchElementException {
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);
        return modelMapper.map(userEntity, UserDetailsDTO.class);
    }

    @Override
    public UserEmailExistsDTO isUserEmailExists(String email) {
        return new UserEmailExistsDTO(userRepository.findByEmail(email).orElse(null) != null);
    }

    @Override
    public UserResponseDTO updateAuthenticatedUser(UserUpdateDTO userUpdateDTO, HttpServletRequest request, HttpServletResponse response) throws NoSuchElementException {
        AuthenticatedUser authenticatedUser = authenticatedUserDataService.getAuthenticatedUserData();

        UserEntity userEntity = userRepository.findById(authenticatedUser.getUserId()).orElseThrow(NoSuchElementException::new);
        userEntity.setName(userUpdateDTO.getName());
        userEntity.setSurname(userUpdateDTO.getSurname());
        userEntity.setPhone(userUpdateDTO.getPhone());
        userEntity.setBirthDate(userUpdateDTO.getBirthDate());

        UserEntity updatedUser = userRepository.save(userEntity);

        Optional<String> jwtToken =  JWTTokenUtils.getInstance().getTokenFromCookie(request, jwtProperties.getCookieName());

        if (jwtToken.isPresent()) {
            AuthenticatedUser userDetails = JWTTokenUtils.getInstance()
                .getAuthenticatedUserFromToken(jwtToken.get(), jwtProperties.getSecret());
            userDetails.setName(userUpdateDTO.getName());
            userDetails.setSurname(userUpdateDTO.getSurname());
            userDetails.setPhone(userUpdateDTO.getPhone());
            userDetails.setBirthDate(DateTimeFormatter.ofPattern("yyyy-MM-dd").format(userUpdateDTO.getBirthDate()));
            response.addHeader(HttpHeaders.SET_COOKIE, JWTTokenUtils.getInstance().generateAuthCookie(
                jwtProperties.getCookieName(),
                jwtProperties.getCookiePath(),
                userDetails,
                jwtProperties.getSecret(),
                jwtProperties.getExpirationInSeconds()
            ).toString());
        }

        return modelMapper.map(updatedUser, UserResponseDTO.class);
    }
}
