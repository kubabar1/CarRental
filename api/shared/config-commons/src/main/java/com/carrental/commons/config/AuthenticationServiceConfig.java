package com.carrental.commons.config;

import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import com.carrental.commons.authentication.service.impl.AuthenticatedUserDataServiceImpl;
import org.springframework.context.annotation.Bean;

public class AuthenticationServiceConfig {

    @Bean
    public AuthenticatedUserDataService authenticatedUserDataService() {
        return new AuthenticatedUserDataServiceImpl();
    }
}
