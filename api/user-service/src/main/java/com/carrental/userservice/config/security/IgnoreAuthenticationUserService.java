package com.carrental.userservice.config.security;

import com.carrental.commons.authentication.config.IgnoreAuthentication;
import org.springframework.context.annotation.Bean;

public class IgnoreAuthenticationUserService {

    @Bean
    public IgnoreAuthentication ignoreAuthenticationUserService() {
        return new IgnoreAuthentication.IgnoreAuthenticationBuilder()
            .addUrl("/users/email-exists/**")
            .addUrl("/reset-password/**")
            .addUrl("/registration/**")
            .addUrl("/h2-console/**")
            .build();
    }
}
