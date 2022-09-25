package com.carrental.userservice.service;

import com.carrental.commons.authentication.exception.AuthorizationException;
import com.carrental.userservice.model.dto.RoleAddDTO;
import com.carrental.userservice.model.dto.UserUpdateDTO;
import com.carrental.userservice.model.dto.UserResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.NoSuchElementException;

public interface UserService {

    UserResponseDTO getAuthorizedUser() throws AuthorizationException, NoSuchElementException;

    UserResponseDTO getUserById(Long userId) throws NoSuchElementException;

    UserResponseDTO addRolesToUser(Long userId, List<RoleAddDTO> roleAddDTOs) throws NoSuchElementException;

    Page<UserResponseDTO> getUsers(Pageable pageable) throws NoSuchElementException;

    UserResponseDTO updateUser(Long userId, UserUpdateDTO userUpdateDTO) throws NoSuchElementException;
}
