package com.carrental.ratingservice.config.security;

import com.carrental.commons.authentication.config.IgnoreAuthentication;
import org.springframework.context.annotation.Bean;

public class IgnoreAuthenticationRatingService {

    @Bean
    public IgnoreAuthentication ignoreAuthenticationRatingService() {
        return new IgnoreAuthentication.IgnoreAuthenticationBuilder()
            .addUrl("/comments/**")
            .addUrl("/h2-console/**")
            .build();
    }
}
