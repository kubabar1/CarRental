package com.carrental.authservice.controller;

import com.carrental.authservice.model.dto.JwtRequest;
import com.carrental.authservice.model.dto.JwtResponse;
import com.carrental.commons.authentication.model.AuthenticatedUser;
import com.carrental.commons.authentication.utils.JWTTokenUtils;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.DisabledException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import javax.validation.Valid;

@RequestMapping("/")
public class AuthenticationController {

    @Value("${jwt.secret}")
    private String secret;

    @Value("${jwt.expirationInSeconds}")
    private Long expirationInSeconds;

    private final UserDetailsService userDetailsService;

    private final AuthenticationManager authenticationManager;

    public AuthenticationController(
        UserDetailsService userDetailsService,
        AuthenticationManager authenticationManager
    ) {
        this.userDetailsService = userDetailsService;
        this.authenticationManager = authenticationManager;
    }

    @PostMapping("/login")
    public ResponseEntity<?> createAuthenticationToken(@Valid @RequestBody JwtRequest authenticationRequest) {
        try {
            authenticationManager.authenticate(
                new UsernamePasswordAuthenticationToken(
                    authenticationRequest.getUsername(),
                    authenticationRequest.getPassword()
                )
            );
        } catch (DisabledException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("USER_DISABLED");
        } catch (BadCredentialsException e) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("INVALID_CREDENTIALS");
        }

        final AuthenticatedUser userDetails = (AuthenticatedUser) userDetailsService
            .loadUserByUsername(authenticationRequest.getUsername());

        final String token = JWTTokenUtils.getInstance().generateToken(userDetails, secret, expirationInSeconds);

        return ResponseEntity.ok(new JwtResponse(token));
    }
}
