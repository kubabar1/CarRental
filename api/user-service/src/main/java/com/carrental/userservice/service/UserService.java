package com.carrental.userservice.service;

import com.carrental.userservice.exception.IncorrectPasswordException;
import com.carrental.userservice.exception.UserAlreadyExistException;
import com.carrental.userservice.model.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.List;
import java.util.NoSuchElementException;

public interface UserService {

    UserResponseDTO getUserById(Long userId) throws NoSuchElementException;

    UserResponseDTO createUser(CreateUserDTO createUserDTO) throws UserAlreadyExistException;

    UserResponseDTO updateUserPassword(PasswordUpdateDTO passwordUpdateDTO) throws IncorrectPasswordException, NoSuchElementException;

    UserResponseDTO addRolesToUser(Long userId, List<RoleAddDTO> roleAddDTOs) throws NoSuchElementException;

    Page<UserResponseDTO> getUsers(Pageable pageable, String filter);

    UsersEmailsResponseDTO getAllUsersEmails();

    UsersEmailsResponseDTO getAllUsersEmailsByIds(List<Long> userIds);

    UsersEmailsResponseDTO sendEmailsToMultipleRecipients(MultipleRecipientsMailsDTO multipleRecipientsMailsDTO);

    UserResponseDTO updateUser(Long userId, UserUpdateDTO userUpdateDTO) throws NoSuchElementException;

    UserResponseDTO enableUser(Long userId, String token) throws NoSuchElementException;

    UserDetailsDTO getUserByEmail(String email) throws NoSuchElementException;

    UserEmailExistsDTO isUserEmailExists(String email);

    UserResponseDTO updateAuthenticatedUser(UserUpdateDTO userUpdateDTO, HttpServletRequest request, HttpServletResponse response) throws NoSuchElementException;
}
