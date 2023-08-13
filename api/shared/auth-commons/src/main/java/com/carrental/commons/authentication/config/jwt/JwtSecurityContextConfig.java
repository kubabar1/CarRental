package com.carrental.commons.authentication.config.jwt;

import org.springframework.context.annotation.Bean;

public class JwtSecurityContextConfig {

    @Bean
    public JwtProperties jwtProperties() {
        return new JwtProperties();
    }

    @Bean
    public JwtSecurityContextRepository jwtSecurityContextRepository(JwtProperties jwtProperties) {
        return new JwtSecurityContextRepository(jwtProperties);
    }
}
