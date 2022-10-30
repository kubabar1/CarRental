package com.carrental.authservice.config;

import com.carrental.authservice.exceptions.UserAlreadyExistException;
import com.carrental.authservice.model.dto.CreateUserDTO;
import com.carrental.authservice.model.dto.UserResponseDTO;

import java.util.List;

public class EmbeddedUsersDBStub {

    private final List<UserResponseDTO> allUsers;

    public EmbeddedUsersDBStub(List<UserResponseDTO> allUsers) {
        this.allUsers = allUsers;
    }

    public UserResponseDTO saveUser(CreateUserDTO createUserDTO) throws UserAlreadyExistException {
        UserResponseDTO userResponseDTO = new UserResponseDTO();
        userResponseDTO.setUserId((long) (allUsers.size() + 1));
        userResponseDTO.setEmail(createUserDTO.getEmail());
        userResponseDTO.setFirstName(createUserDTO.getFirstName());
        userResponseDTO.setLastName(createUserDTO.getLastName());
        userResponseDTO.setUserName(createUserDTO.getUserName());
        if (getUserByUsername(createUserDTO.getUserName()) != null) {
            throw new UserAlreadyExistException("User with given username already exists");
        }
        if (getUserByEmail(createUserDTO.getUserName()) != null) {
            throw new UserAlreadyExistException("User with given email already exists");
        }
        allUsers.add(userResponseDTO);
        return userResponseDTO;
    }

    public UserResponseDTO getUserByUsername(String username) {
        return allUsers.stream()
                .filter(userResponseDTO -> userResponseDTO.getUserName().equals(username))
                .findFirst()
                .orElse(null);
    }

    public UserResponseDTO getUserByEmail(String email) {
        return allUsers.stream()
                .filter(userResponseDTO -> userResponseDTO.getEmail().equals(email))
                .findFirst()
                .orElse(null);
    }

    public UserResponseDTO getUserById(Long userId) {
        return allUsers.stream()
                .filter(userResponseDTO -> userResponseDTO.getUserId().equals(userId))
                .findFirst()
                .orElse(null);
    }

    public UserResponseDTO enableUser(Long userId) {
        UserResponseDTO user = getUserById(userId);
        user.setEnabled(true);
        return getUserById(userId);
    }
}
