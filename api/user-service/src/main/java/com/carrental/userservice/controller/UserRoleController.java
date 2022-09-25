package com.carrental.userservice.controller;

import com.carrental.userservice.model.dto.UserRoleResponseDTO;
import com.carrental.userservice.service.UserRoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@CrossOrigin
@RequestMapping("/users-roles")
public class UserRoleController {

    private UserRoleService userRoleService;

    public UserRoleController(UserRoleService userRoleService) {
        this.userRoleService = userRoleService;
    }

    @GetMapping
    public ResponseEntity<Set<UserRoleResponseDTO>> getUsersRolesController() {
        Set<UserRoleResponseDTO> userRoleResponseDTOS = userRoleService.getRoles();
        if (userRoleResponseDTOS.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(userRoleResponseDTOS);
    }

    @GetMapping(value = "/not-assigned/{userId}")
    public ResponseEntity<Set<UserRoleResponseDTO>> getAllUserRolesNotAssignedToUser(@PathVariable(value = "userId") Long userId) {
        Set<UserRoleResponseDTO> userRoleResponseDTOS = userRoleService.getAllUserRolesNotAssignedToUser(userId);
        if (userRoleResponseDTOS.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(userRoleResponseDTOS);
    }
}
