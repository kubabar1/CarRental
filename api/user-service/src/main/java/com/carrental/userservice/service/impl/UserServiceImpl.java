package com.carrental.userservice.service.impl;

import com.carrental.commons.authentication.exception.AuthorizationException;
import com.carrental.commons.authentication.model.AuthenticatedUserData;
import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import com.carrental.userservice.exception.UserAlreadyExistException;
import com.carrental.userservice.model.dto.*;
import com.carrental.userservice.model.entity.UserEntity;
import com.carrental.userservice.model.entity.UserRoleEntity;
import com.carrental.userservice.repository.UserRepository;
import com.carrental.userservice.repository.UserRoleRepository;
import com.carrental.userservice.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;

    private final UserRoleRepository userRoleRepository;

    private final AuthenticatedUserDataService authenticatedUserDataService;

    private final ModelMapper modelMapper;

    private final PasswordEncoder passwordEncoder;

    public UserServiceImpl(
            UserRepository userRepository,
            UserRoleRepository userRoleRepository,
            AuthenticatedUserDataService authenticatedUserDataService,
            ModelMapper modelMapper,
            PasswordEncoder passwordEncoder
    ) {
        this.userRepository = userRepository;
        this.userRoleRepository = userRoleRepository;
        this.authenticatedUserDataService = authenticatedUserDataService;
        this.modelMapper = modelMapper;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    public UserResponseDTO getAuthorizedUser() throws AuthorizationException, NoSuchElementException {
        AuthenticatedUserData authenticatedUserData = authenticatedUserDataService.getAuthenticatedUserData();
        return modelMapper.map(userRepository.findById(authenticatedUserData.getId()).orElseThrow(), UserResponseDTO.class);
    }

    @Override
    public UserResponseDTO getUserById(Long userId) throws NoSuchElementException {
        return modelMapper.map(userRepository.findById(userId).orElseThrow(), UserResponseDTO.class);
    }

    @Override
    public Page<UserResponseDTO> getUsers(Pageable pageable) throws NoSuchElementException {
        Page<UserEntity> userEntityPage = userRepository.findAll(pageable);
        List<UserResponseDTO> userResponseDTOList = userEntityPage
                .getContent()
                .stream()
                .map(userEntity -> modelMapper.map(userEntity, UserResponseDTO.class))
                .collect(Collectors.toList());
        return new PageImpl<>(userResponseDTOList, pageable, userEntityPage.getTotalElements());
    }

    @Override
    public UserResponseDTO addRolesToUser(Long userId, List<RoleAddDTO> roleAddDTOs) throws NoSuchElementException {
        UserEntity userEntity = userRepository.findById(userId).orElseThrow();
        Set<UserRoleEntity> userRolesEntityToAddList = roleAddDTOs
                .stream()
                .map(userRole -> userRoleRepository.findById(userRole.getRoleId()).orElseThrow())
                .collect(Collectors.toSet());
        userEntity.getRoles().addAll(userRolesEntityToAddList);
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
        UserRoleEntity userRoleEntity = userRoleRepository.findByType("ROLE_CUSTOMER").orElseThrow(NoSuchElementException::new);
        validateUserEmail(createUserDTO);

        UserEntity userEntity = new UserEntity();
        userEntity.setEmail(createUserDTO.getEmail());
        userEntity.setPassword(passwordEncoder.encode(createUserDTO.getPassword()));
        userEntity.setName(createUserDTO.getFirstName());
        userEntity.setSurname(createUserDTO.getLastName());
        userEntity.setBirthDate(createUserDTO.getBirthDate());
        userEntity.setPhone(createUserDTO.getPhone());
        userEntity.setRoles(Collections.singleton(userRoleEntity));

        return modelMapper.map(userRepository.save(userEntity), UserResponseDTO.class);
    }

    private void validateUserEmail(CreateUserDTO createUserDTO) throws UserAlreadyExistException {
        String emailOfUserToCreate = createUserDTO.getEmail();
        UserEntity userWithGivenEmail = userRepository.findByEmail(emailOfUserToCreate).orElse(null);
        if (userWithGivenEmail != null) {
            throw new UserAlreadyExistException("User with given email already exists");
        }
    }

    @Override
    public UserResponseDTO enableUser(Long userId) throws NoSuchElementException {
        UserEntity userEntityToUpdate = userRepository.findById(userId).orElseThrow(NoSuchElementException::new);
        userEntityToUpdate.setEnabled(true);
        return modelMapper.map(userRepository.save(userEntityToUpdate), UserResponseDTO.class);
    }

    @Override
    public UserDetailsDTO getUserByEmail(String email) throws NoSuchElementException {
        UserEntity userEntity = userRepository.findByEmail(email).orElseThrow(NoSuchElementException::new);
        return modelMapper.map(userEntity, UserDetailsDTO.class);
    }
}
