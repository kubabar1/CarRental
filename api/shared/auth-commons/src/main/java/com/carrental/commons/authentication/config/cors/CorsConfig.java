package com.carrental.commons.authentication.config.cors;

import org.springframework.context.annotation.Bean;

public class CorsConfig {

    @Bean
    private CorsProperties corsProperties() {
        return new CorsProperties();
    }

    @Bean
    private CorsConfigSource corsConfigSource(CorsProperties corsProperties) {
        return new CorsConfigSource(corsProperties);
    }
}
