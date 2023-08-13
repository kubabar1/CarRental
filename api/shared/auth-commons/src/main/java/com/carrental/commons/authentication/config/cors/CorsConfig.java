package com.carrental.commons.authentication.config.cors;

import org.springframework.context.annotation.Bean;

public class CorsConfig {

    @Bean
    public CorsProperties corsProperties() {
        return new CorsProperties();
    }

    @Bean
    public CorsConfigSource corsConfigSource(CorsProperties corsProperties) {
//        final UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", configuration);
//        return source;
        return new CorsConfigSource(corsProperties);
    }
}
