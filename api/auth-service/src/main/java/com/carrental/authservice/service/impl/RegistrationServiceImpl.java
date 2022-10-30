package com.carrental.authservice.service.impl;

import com.carrental.authservice.config.EmbeddedUsersDBStub;
import com.carrental.authservice.exceptions.UserAlreadyExistException;
import com.carrental.authservice.model.dto.CreateUserDTO;
import com.carrental.authservice.model.dto.UserResponseDTO;
import com.carrental.authservice.service.RegistrationService;

public class RegistrationServiceImpl implements RegistrationService {

    private final EmbeddedUsersDBStub embeddedUsersDBStub;

    public RegistrationServiceImpl(EmbeddedUsersDBStub embeddedUsersDBStub) {
        this.embeddedUsersDBStub = embeddedUsersDBStub;
    }

    @Override
    public UserResponseDTO registerUser(CreateUserDTO createUserDTO) throws UserAlreadyExistException {
        if (!validateEmail(createUserDTO.getEmail())) {
            throw new UserAlreadyExistException("User with given email already exists");
        }
        if (!validateUserName(createUserDTO.getEmail())) {
            throw new UserAlreadyExistException("User with given user name already exists");
        }
        return saveUser(createUserDTO);
    }

    @Override
    public UserResponseDTO enableRegisteredUser(Long userId) {
        return enableUser(userId);
    }

    private boolean validateEmail(String email) {
        return true;
    }

    private boolean validateUserName(String userName) {
        return true;
    }

    private UserResponseDTO saveUser(CreateUserDTO createUserDTO) {
        return embeddedUsersDBStub.saveUser(createUserDTO);
    }

    private UserResponseDTO enableUser(Long userId) {
        return embeddedUsersDBStub.enableUser(userId);
    }
}
