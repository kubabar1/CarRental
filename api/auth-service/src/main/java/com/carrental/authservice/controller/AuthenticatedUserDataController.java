package com.carrental.authservice.controller;

import com.carrental.commons.authentication.model.AuthenticatedUserDTO;
import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;


@RequestMapping("/authentication")
public class AuthenticatedUserDataController {

    private final AuthenticatedUserDataService authenticatedUserDataService;

    public AuthenticatedUserDataController(AuthenticatedUserDataService authenticatedUserDataService) {
        this.authenticatedUserDataService = authenticatedUserDataService;
    }

    @GetMapping("/user-data")
    public ResponseEntity<AuthenticatedUserDTO> authenticatedUserDataController() {
        return ResponseEntity.ok().body(authenticatedUserDataService.getAuthenticatedUserData());
    }

    @GetMapping("/is-authenticated")
    public ResponseEntity<Boolean> isAuthenticatedController() {
        return ResponseEntity.ok().body(SecurityContextHolder.getContext().getAuthentication().isAuthenticated());
    }
}
