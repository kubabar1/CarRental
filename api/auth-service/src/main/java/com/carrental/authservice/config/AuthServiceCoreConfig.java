package com.carrental.authservice.config;

import com.carrental.authservice.config.properties.AuthServiceProperties;
import com.carrental.authservice.config.queue.AuthServiceQueueConfig;
import com.carrental.authservice.config.security.*;
import com.carrental.authservice.controller.AuthenticatedUserDataController;
import com.carrental.authservice.listener.TokenListener;
import com.carrental.authservice.repository.TokenRepository;
import com.carrental.authservice.service.TokenService;
import com.carrental.authservice.service.impl.TokenServiceImpl;
import com.carrental.authservice.service.impl.UserDetailsServiceImpl;
import com.carrental.commons.authentication.config.jwt.JwtSecurityContextConfig;
import com.carrental.commons.authentication.config.jwt.JwtProperties;
import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import org.modelmapper.ModelMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.config.annotation.method.configuration.EnableGlobalMethodSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Import({
    WebSecurityConfig.class,
    JwtSecurityContextConfig.class,
    AuthServiceQueueConfig.class
})
@EnableWebSecurity
@EnableJpaRepositories("com.carrental.authservice.repository")
@EntityScan("com.carrental.authservice.model.entity")
@EnableGlobalMethodSecurity(prePostEnabled = true)
@ComponentScan(basePackages = { "com.carrental.authservice.*" })
public class AuthServiceCoreConfig {

    @Bean
    public JwtSessionAuthenticationStrategy jwtSessionAuthenticationStrategy(JwtProperties jwtProperties) {
        return new JwtSessionAuthenticationStrategy(jwtProperties);
    }

    @Bean
    public AuthServiceProperties authServiceProperties() {
        return new AuthServiceProperties();
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(RabbitTemplate rabbitTemplate, AuthServiceProperties authServiceProperties) {
        return new UserDetailsServiceImpl(rabbitTemplate, authServiceProperties);
    }

    @Bean
    public TokenService tokenService(TokenRepository tokenRepository, ModelMapper modelMapper) {
        return new TokenServiceImpl(tokenRepository, modelMapper);
    }

    @Bean
    public TokenListener tokenListener(TokenService tokenService) {
        return new TokenListener(tokenService);
    }

    @Bean
    public AuthenticatedUserDataController authenticatedUserDataController(
        AuthenticatedUserDataService authenticatedUserDataService
    ) {
        return new AuthenticatedUserDataController(
            authenticatedUserDataService
        );
    }
}
