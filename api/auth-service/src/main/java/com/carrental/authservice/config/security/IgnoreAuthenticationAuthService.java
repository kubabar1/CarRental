package com.carrental.authservice.config.security;

import com.carrental.commons.authentication.config.IgnoreAuthentication;
import org.springframework.context.annotation.Bean;

public class IgnoreAuthenticationAuthService {

    @Bean
    public IgnoreAuthentication ignoreAuthenticationAuthService() {
        return new IgnoreAuthentication.IgnoreAuthenticationBuilder()
            .addUrl("/login")
            .addUrl("/authentication/**")
            .addUrl("/h2-console/**")
            .build();
    }
}
