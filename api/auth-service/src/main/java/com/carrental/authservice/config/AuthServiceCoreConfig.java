package com.carrental.authservice.config;

import com.carrental.authservice.listener.TokenListener;
import com.carrental.authservice.repository.TokenRepository;
import com.carrental.authservice.service.TokenService;
import com.carrental.authservice.service.impl.TokenServiceImpl;
import com.carrental.authservice.service.impl.UserDetailsServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@Import({
        SecurityConfig.class
})
@EnableWebSecurity
public class AuthServiceCoreConfig {

    @Bean
    public RestAuthenticationEntryPoint restAuthenticationEntryPoint() {
        return new RestAuthenticationEntryPoint();
    }

    @Bean
    public PasswordEncoder encoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserDetailsService userDetailsService(RabbitTemplate rabbitTemplate) {
        return new UserDetailsServiceImpl(rabbitTemplate);
    }

    @Bean
    public TokenService tokenService(TokenRepository tokenRepository, ModelMapper modelMapper) {
        return new TokenServiceImpl(tokenRepository, modelMapper);
    }

    @Bean
    public TokenListener tokenListener(TokenService tokenService) {
        return new TokenListener(tokenService);
    }
}
