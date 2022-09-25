package com.carrental.userservice.service.impl;

import com.carrental.userservice.model.dto.UserRoleResponseDTO;
import com.carrental.userservice.repository.UserRoleRepository;
import com.carrental.userservice.service.UserRoleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

public class UserRoleServiceImpl implements UserRoleService {

    private UserRoleRepository userRoleRepository;

    private ModelMapper modelMapper;

    public UserRoleServiceImpl(UserRoleRepository userRoleRepository, ModelMapper modelMapper) {
        this.userRoleRepository = userRoleRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Set<UserRoleResponseDTO> getRoles() {
        return userRoleRepository
                .findAll()
                .stream()
                .map(userRoleEntity -> modelMapper.map(userRoleEntity, UserRoleResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public Set<UserRoleResponseDTO> getAllUserRolesNotAssignedToUser(Long userId) {
        return userRoleRepository
                .getAllUserRolesNotAssignedToUser(userId)
                .stream()
                .map(userRoleEntity -> modelMapper.map(userRoleEntity, UserRoleResponseDTO.class))
                .collect(Collectors.toSet());
    }
}
