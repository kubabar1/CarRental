package com.carrental.userservice.config;

import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import com.carrental.userservice.controller.RegistrationController;
import com.carrental.userservice.controller.UserController;
import com.carrental.userservice.controller.UserRoleController;
import com.carrental.userservice.listener.RegistrationCompleteListener;
import com.carrental.userservice.listener.ResendRegistrationConfirmTokenListener;
import com.carrental.userservice.listener.UserListener;
import com.carrental.userservice.repository.UserRepository;
import com.carrental.userservice.repository.UserRoleRepository;
import com.carrental.userservice.service.UserRoleService;
import com.carrental.userservice.service.UserService;
import com.carrental.userservice.service.impl.UserRoleServiceImpl;
import com.carrental.userservice.service.impl.UserServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

public class UserServiceCoreConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserService userService(
            UserRepository userRepository,
            UserRoleRepository userRoleRepository,
            AuthenticatedUserDataService authenticatedUserDataService,
            ModelMapper modelMapper,
            PasswordEncoder passwordEncoder
    ) {
        return new UserServiceImpl(userRepository, userRoleRepository, authenticatedUserDataService, modelMapper, passwordEncoder);
    }

    @Bean
    public UserRoleService userRoleService(
            UserRoleRepository userRoleRepository,
            ModelMapper modelMapper
    ) {
        return new UserRoleServiceImpl(userRoleRepository, modelMapper);
    }

    @Bean
    public UserController userController(UserService userService) {
        return new UserController(userService);
    }

    @Bean
    public RegistrationController registrationController(
            UserService userService,
            ApplicationEventPublisher eventPublisher,
            RabbitTemplate rabbitTemplate
    ) {
        return new RegistrationController(userService, eventPublisher, rabbitTemplate);
    }

    @Bean
    public RegistrationCompleteListener registrationListener(RabbitTemplate rabbitTemplate) {
        return new RegistrationCompleteListener(rabbitTemplate);
    }

    @Bean
    public ResendRegistrationConfirmTokenListener resendRegistrationConfirmTokenListener(RabbitTemplate rabbitTemplate) {
        return new ResendRegistrationConfirmTokenListener(rabbitTemplate);
    }

    @Bean
    public UserRoleController userRoleController(UserRoleService userRoleService) {
        return new UserRoleController(userRoleService);
    }

    @Bean
    public RabbitTemplate rabbitTemplate(
            ConnectionFactory connectionFactory,
            Jackson2JsonMessageConverter jackson2JsonMessageConverter
    ) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jackson2JsonMessageConverter);
        return rabbitTemplate;
    }

    @Bean
    public Jackson2JsonMessageConverter producerJackson2MessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public UserListener userListener(UserService userService) {
        return new UserListener(userService);
    }
}