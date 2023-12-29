package com.carrental.userservice.controller;

import com.carrental.commons.authentication.exception.AuthorizationException;
import com.carrental.userservice.exception.IncorrectPasswordException;
import com.carrental.userservice.exception.UserAlreadyExistException;
import com.carrental.userservice.model.dto.*;
import com.carrental.userservice.service.UserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.validation.Valid;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<UserResponseDTO>> getUsersController(
        @RequestParam(value = "filter", required = false) String filter,
        Pageable pageable
    ) {
        return ResponseEntity.ok().body(userService.getUsers(pageable, filter));
    }

    @GetMapping("/all-emails")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UsersEmailsResponseDTO> getUsersEmailsController() {
        return ResponseEntity.ok().body(userService.getAllUsersEmails());
    }

    @PostMapping("/send-emails")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UsersEmailsResponseDTO> sendEmailsToUsers(
        @RequestBody MultipleRecipientsMailsDTO multipleRecipientsMailsDTO
    ) {
        return ResponseEntity.ok().body(userService.sendEmailsToMultipleRecipients(multipleRecipientsMailsDTO));
    }

    @PostMapping("/selected-users-emails")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<UsersEmailsResponseDTO> getAllUsersEmailsByIdsController(
        @RequestBody List<Long> userIds
    ) {
        return ResponseEntity.ok().body(userService.getAllUsersEmailsByIds(userIds));
    }

    @PostMapping("/email-exists")
    public ResponseEntity<UserEmailExistsDTO> getUserEmailExistsController(
        @Valid @RequestBody PasswordResetRequestDTO passwordResetRequestDTO
    ) {
        return ResponseEntity.ok().body(userService.isUserEmailExists(passwordResetRequestDTO.getEmail()));
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

    @PutMapping("/update-authenticated-user")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserResponseDTO> updateAuthenticatedUserController(
        @Valid @RequestBody UserUpdateDTO userUpdateDTO,
        HttpServletRequest request,
        HttpServletResponse response
    ) {
        try {
            return ResponseEntity.ok().body(userService.updateAuthenticatedUser(userUpdateDTO, request, response));
        } catch (NoSuchElementException exception) {
            return ResponseEntity.badRequest().build();
        }
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

    @PutMapping(value = "/update-password")
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<UserResponseDTO> updatePasswordController(@Valid @RequestBody PasswordUpdateDTO passwordUpdateDTO) {
        try {
            return ResponseEntity.ok().body(userService.updateUserPassword(passwordUpdateDTO));
        } catch (NoSuchElementException exception) {
            return ResponseEntity.badRequest().build();
        }
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = ex.getBindingResult().getAllErrors().stream()
            .collect(Collectors.toMap(
                e -> e instanceof FieldError ? ((FieldError) e).getField() : "",
                e -> e.getDefaultMessage() == null ? "" : e.getDefaultMessage())
            );
        return ResponseEntity.badRequest().body(errors);
    }

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(IncorrectPasswordException.class)
    public ResponseEntity<Map<String, String>> handleIncorrectPasswordException(IncorrectPasswordException ex) {
        Map<String, String> error = new HashMap<>() {{
            put("currentPassword", ex.getMessage());
        }};
        return ResponseEntity.badRequest().body(error);
    }
}
