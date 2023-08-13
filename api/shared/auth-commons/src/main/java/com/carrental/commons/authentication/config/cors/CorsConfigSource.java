package com.carrental.commons.authentication.config.cors;

import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;

import javax.servlet.http.HttpServletRequest;
import java.util.Arrays;

public class CorsConfigSource implements CorsConfigurationSource {

    private final CorsProperties corsProperties;

    public CorsConfigSource(CorsProperties corsProperties) {
        this.corsProperties = corsProperties;
    }

    @Override
    public CorsConfiguration getCorsConfiguration(HttpServletRequest request) {
        final CorsConfiguration configuration = new CorsConfiguration();
        configuration.setAllowedOrigins(Arrays.asList(corsProperties.getAllowedOrigins()));
        configuration.setAllowedMethods(Arrays.asList(corsProperties.getAllowedMethods()));
        configuration.setAllowCredentials(corsProperties.getAllowCredentials());
        configuration.setAllowedHeaders(Arrays.asList(corsProperties.getAllowedHeaders()));
        return configuration;
    }
}
