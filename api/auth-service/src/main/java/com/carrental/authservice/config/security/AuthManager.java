package com.carrental.authservice.config.security;

import org.springframework.context.annotation.Bean;
import org.springframework.security.authentication.AuthenticationManager;

import javax.inject.Inject;

public class AuthManager {

    @Inject
    private WebSecurityConfig webSecurityConfig;

    @Bean
    public AuthenticationManager authenticationManager() throws Exception {
        return webSecurityConfig.authenticationManagerBean();
    }
}
