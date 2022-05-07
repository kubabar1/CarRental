package com.carrental.userservice.service;

import com.carrental.userservice.model.dto.UserRoleResponseDTO;

import java.util.Set;

public interface UserRoleService {

    Set<UserRoleResponseDTO> getRoles();

    Set<UserRoleResponseDTO> getAllUserRolesNotAssignedToUser(Long userId);
}
