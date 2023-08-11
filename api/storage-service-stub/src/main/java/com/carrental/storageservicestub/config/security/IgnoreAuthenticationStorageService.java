package com.carrental.storageservicestub.config.security;

import com.carrental.commons.authentication.config.IgnoreAuthentication;
import org.springframework.context.annotation.Bean;

public class IgnoreAuthenticationStorageService {

    @Bean
    public IgnoreAuthentication ignoreAuthenticationStorageService() {
        return new IgnoreAuthentication.IgnoreAuthenticationBuilder()
                .addUrl("/vehicles-images/**")
                .build();
    }
}
