package com.carrental.userservice.service.impl;

import com.carrental.userservice.model.dto.UserRoleResponseDTO;
import com.carrental.userservice.model.entity.UserRoleEntity;
import com.carrental.userservice.repository.UserRoleRepository;
import com.carrental.userservice.service.UserRoleService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Sort;

import java.util.LinkedHashSet;
import java.util.Set;
import java.util.stream.Collectors;

public class UserRoleServiceImpl implements UserRoleService {

    private final UserRoleRepository userRoleRepository;

    private final ModelMapper modelMapper;

    public UserRoleServiceImpl(UserRoleRepository userRoleRepository, ModelMapper modelMapper) {
        this.userRoleRepository = userRoleRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Set<UserRoleResponseDTO> getRoles() {
        return userRoleRepository
                .findAll(Sort.by(Sort.Direction.ASC, "id"))
                .stream()
                .map(userRoleEntity -> modelMapper.map(userRoleEntity, UserRoleResponseDTO.class))
                .collect( Collectors.toCollection(LinkedHashSet::new));
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
