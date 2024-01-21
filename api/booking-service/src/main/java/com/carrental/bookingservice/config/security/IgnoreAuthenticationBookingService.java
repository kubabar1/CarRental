package com.carrental.bookingservice.config.security;

import com.carrental.commons.authentication.config.IgnoreAuthentication;
import org.springframework.context.annotation.Bean;

public class IgnoreAuthenticationBookingService {

    @Bean
    public IgnoreAuthentication ignoreAuthenticationBookingService() {
        return new IgnoreAuthentication.IgnoreAuthenticationBuilder()
            .addUrl("/locations")
            .addUrl("/locations/all")
            .addUrl("/h2-console/**")
            .addUrl("/swagger-ui/**")
            .addUrl("/swagger-resources/**")
            .addUrl("/v2/api-docs/**")
            .build();
    }
}
