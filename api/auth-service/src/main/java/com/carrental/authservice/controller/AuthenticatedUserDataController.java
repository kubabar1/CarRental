package com.carrental.authservice.controller;

import com.carrental.commons.authentication.model.AuthenticatedUser;
import com.carrental.commons.authentication.model.AuthenticatedUserDTO;
import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.stream.Collectors;


@RequestMapping("/authentication")
public class AuthenticatedUserDataController {

    private final AuthenticatedUserDataService authenticatedUserDataService;

    public AuthenticatedUserDataController(AuthenticatedUserDataService authenticatedUserDataService) {
        this.authenticatedUserDataService = authenticatedUserDataService;
    }

    @GetMapping("/user-data")
    public ResponseEntity<AuthenticatedUserDTO> authenticatedUserDataController() {
        AuthenticatedUser userDetails = authenticatedUserDataService.getAuthenticatedUserData();
        AuthenticatedUserDTO authenticatedUserDTO = new AuthenticatedUserDTO();
        if (userDetails != null) {
            authenticatedUserDTO.setId(userDetails.getUserId());
            authenticatedUserDTO.setEmail(userDetails.getEmail());
            authenticatedUserDTO.setAuthenticated(true);
            authenticatedUserDTO.setName(userDetails.getName());
            authenticatedUserDTO.setSurname(userDetails.getSurname());
            authenticatedUserDTO.setPhone(userDetails.getPhone());
            authenticatedUserDTO.setBirthDate(userDetails.getBirthDate());
            authenticatedUserDTO.setUserRoles(userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()));
        } else {
            authenticatedUserDTO.setAuthenticated(false);
        }
        return ResponseEntity.ok().body(authenticatedUserDTO);
    }

    @GetMapping("/is-authenticated")
    public ResponseEntity<Boolean> isAuthenticatedController() {
        return ResponseEntity.ok().body(SecurityContextHolder.getContext().getAuthentication().isAuthenticated());
    }
}
