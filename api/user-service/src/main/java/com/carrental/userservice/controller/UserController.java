package com.carrental.userservice.controller;

import com.carrental.userservice.model.dto.RoleAddDTO;
import com.carrental.userservice.model.dto.UserEmailUniqueDTO;
import com.carrental.userservice.model.dto.UserUpdateDTO;
import com.carrental.userservice.model.dto.UserResponseDTO;
import com.carrental.userservice.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.List;
import java.util.NoSuchElementException;

@CrossOrigin
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<UserResponseDTO>> getUsersController(Pageable pageable) {
        return ResponseEntity.ok().body(userService.getUsers(pageable));
    }

    @GetMapping("/unique-email")
    public ResponseEntity<UserEmailUniqueDTO> getUserEmailUniqueController(String userEmail) {
        return ResponseEntity.ok().body(userService.isUserEmailUnique(userEmail));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserResponseDTO> getUserByIdController(@PathVariable("id") Long userId) {
        try {
            return ResponseEntity.ok().body(userService.getUserById(userId));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping("/{id}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserResponseDTO> updateUserController(@PathVariable("id") Long userId,
                                                                @Valid @RequestBody UserUpdateDTO userUpdateDTO) {
        return ResponseEntity.ok().body(userService.updateUser(userId, userUpdateDTO));
    }

    @PostMapping("/{userId}/roles")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UserResponseDTO> addRoleToUserController(@PathVariable("userId") Long userId,
                                                                   @Valid @RequestBody List<RoleAddDTO> roleAddDTOs) {
        try {
            UserResponseDTO userResponseDTO = userService.addRolesToUser(userId, roleAddDTOs);
            return ResponseEntity.ok().body(userResponseDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
