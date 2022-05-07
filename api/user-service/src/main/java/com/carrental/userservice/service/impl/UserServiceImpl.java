package com.carrental.userservice.service.impl;

import com.carrental.commons.authentication.exception.AuthorizationException;
import com.carrental.commons.authentication.model.AuthenticatedUserData;
import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import com.carrental.userservice.model.dto.RoleAddDTO;
import com.carrental.userservice.model.dto.UserUpdateDTO;
import com.carrental.userservice.model.dto.UserResponseDTO;
import com.carrental.userservice.model.entity.UserEntity;
import com.carrental.userservice.model.entity.UserRoleEntity;
import com.carrental.userservice.repository.UserRepository;
import com.carrental.userservice.repository.UserRoleRepository;
import com.carrental.userservice.service.UserService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private UserRoleRepository userRoleRepository;

    @Autowired
    private AuthenticatedUserDataService authenticatedUserDataService;

    @Autowired
    private ModelMapper modelMapper;


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
    public Set<UserResponseDTO> getUsers() throws NoSuchElementException {
        return userRepository
                .findAll()
                .stream()
                .map(userEntity -> modelMapper.map(userEntity, UserResponseDTO.class))
                .collect(Collectors.toSet());
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
}
