package com.carrental.authservice.config.security;

import com.carrental.commons.authentication.config.JwtRequestFilter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;

public class FiltersConfig {

    @Value("${jwt.secret}")
    private String secret;

    @Bean
    public JwtRequestFilter jwtRequestFilter() {
        return new JwtRequestFilter(secret);
    }
}
