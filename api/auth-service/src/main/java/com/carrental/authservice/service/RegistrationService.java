package com.carrental.authservice.service;

import com.carrental.authservice.exceptions.UserAlreadyExistException;
import com.carrental.authservice.model.dto.CreateUserDTO;
import com.carrental.authservice.model.dto.UserResponseDTO;

public interface RegistrationService {

    UserResponseDTO registerUser(CreateUserDTO createUserDTO) throws UserAlreadyExistException;

    UserResponseDTO enableRegisteredUser(Long userId);
}
