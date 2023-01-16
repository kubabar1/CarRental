package com.carrental.userservice.service;

import com.carrental.commons.authentication.exception.AuthorizationException;
import com.carrental.userservice.exception.UserAlreadyExistException;
import com.carrental.userservice.model.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.NoSuchElementException;

public interface UserService {

    UserResponseDTO getAuthorizedUser() throws AuthorizationException, NoSuchElementException;

    UserResponseDTO getUserById(Long userId) throws NoSuchElementException;

    UserResponseDTO createUser(CreateUserDTO createUserDTO) throws UserAlreadyExistException;

    UserResponseDTO updateUserPassword(PasswordUpdateDTO passwordUpdateDTO) throws AuthorizationException, NoSuchElementException;

    UserResponseDTO addRolesToUser(Long userId, List<RoleAddDTO> roleAddDTOs) throws NoSuchElementException;

    Page<UserResponseDTO> getUsers(Pageable pageable) throws NoSuchElementException;

    UserResponseDTO updateUser(Long userId, UserUpdateDTO userUpdateDTO) throws NoSuchElementException;

    UserResponseDTO enableUser(Long userId) throws NoSuchElementException;

    UserDetailsDTO getUserByEmail(String email) throws NoSuchElementException;

    UserEmailUniqueDTO isUserEmailUnique(String email);
}
