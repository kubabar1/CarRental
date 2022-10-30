package com.carrental.authservice.config;

import com.carrental.authservice.controller.RegistrationController;
import com.carrental.authservice.repository.TokenRepository;
import com.carrental.authservice.service.MailService;
import com.carrental.authservice.service.RegistrationService;
import com.carrental.authservice.service.TokenService;
import com.carrental.authservice.event.listener.RegistrationListener;
import com.carrental.authservice.service.impl.MailServiceImpl;
import com.carrental.authservice.service.impl.RegistrationServiceImpl;
import com.carrental.authservice.service.impl.TokenServiceImpl;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;

import java.util.ArrayList;

@Import({
        SecurityConfig.class,
        MailConfig.class
})
@EnableWebSecurity
public class AuthServiceCoreConfig {

    @Bean
    public RegistrationService registrationService(EmbeddedUsersDBStub embeddedUsersDBStub) {
        return new RegistrationServiceImpl(embeddedUsersDBStub);
    }

    @Bean
    public RegistrationController registrationController(
            RegistrationService registrationService,
            ApplicationEventPublisher eventPublisher,
            TokenService tokenService
    ) {
        return new RegistrationController(registrationService, eventPublisher, tokenService);
    }

    @Bean
    public EmbeddedUsersDBStub embeddedUserDB() {
        return new EmbeddedUsersDBStub(new ArrayList<>());
    }

    @Bean
    public TokenService tokenService(TokenRepository tokenRepository) {
        return new TokenServiceImpl(tokenRepository);
    }

    @Bean
    public MailService mailService() {
        return new MailServiceImpl();
    }

    @Bean
    public RegistrationListener registrationListener(
            TokenService tokenService,
            JavaMailSender mailSender,
            EmbeddedUsersDBStub embeddedUserDB,
            MailService mailService
    ) {
        return new RegistrationListener(tokenService, mailSender, embeddedUserDB, mailService);
    }
}
