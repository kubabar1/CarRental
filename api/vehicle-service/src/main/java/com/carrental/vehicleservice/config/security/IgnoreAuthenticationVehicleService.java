package com.carrental.vehicleservice.config.security;

import com.carrental.commons.authentication.config.IgnoreAuthentication;
import org.springframework.context.annotation.Bean;

public class IgnoreAuthenticationVehicleService {

    @Bean
    public IgnoreAuthentication ignoreAuthenticationVehicleService() {
        return new IgnoreAuthentication.IgnoreAuthenticationBuilder()
            .addUrl("/vehicles/**")
            .addUrl("/h2-console/**")
            .build();
    }
}
