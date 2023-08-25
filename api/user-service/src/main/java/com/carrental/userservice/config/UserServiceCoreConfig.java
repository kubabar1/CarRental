package com.carrental.userservice.config;

import com.carrental.commons.authentication.config.jwt.JwtProperties;
import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import com.carrental.commons.utils.filtering.FilterSpecificationBuilder;
import com.carrental.userservice.config.properties.UserServiceProperties;
import com.carrental.userservice.config.queue.UserServiceQueueConfig;
import com.carrental.userservice.config.security.IgnoreAuthenticationUserService;
import com.carrental.userservice.controller.RegistrationController;
import com.carrental.userservice.controller.ResetPasswordController;
import com.carrental.userservice.controller.UserController;
import com.carrental.userservice.controller.UserRoleController;
import com.carrental.userservice.listener.RegistrationCompleteListener;
import com.carrental.userservice.listener.ResendRegistrationConfirmTokenListener;
import com.carrental.userservice.listener.SendResetPasswordEmailListener;
import com.carrental.userservice.listener.UserListener;
import com.carrental.userservice.model.entity.UserEntity;
import com.carrental.userservice.repository.UserRepository;
import com.carrental.userservice.repository.UserRoleRepository;
import com.carrental.userservice.service.ResetPasswordService;
import com.carrental.userservice.service.UserRoleService;
import com.carrental.userservice.service.UserService;
import com.carrental.userservice.service.impl.ResetPasswordServiceImpl;
import com.carrental.userservice.service.impl.UserRoleServiceImpl;
import com.carrental.userservice.service.impl.UserServiceImpl;
import com.carrental.userservice.service.impl.filtering.UserFilterOperation;
import org.modelmapper.ModelMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.ApplicationEventPublisher;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;

@EnableJpaRepositories("com.carrental.userservice.repository")
@EntityScan("com.carrental.userservice.model.entity")
@Import({UserServiceQueueConfig.class, IgnoreAuthenticationUserService.class})
public class UserServiceCoreConfig {

    @Bean
    public PasswordEncoder passwordEncoder() {
        return new BCryptPasswordEncoder();
    }

    @Bean
    public UserFilterOperation<UserEntity> userFilterOperation() {
        return new UserFilterOperation<>();
    }

    @Bean
    public UserService userService(
            UserRepository userRepository,
            UserRoleRepository userRoleRepository,
            AuthenticatedUserDataService authenticatedUserDataService,
            ModelMapper modelMapper,
            PasswordEncoder passwordEncoder,
            RabbitTemplate rabbitTemplate,
            UserFilterOperation<UserEntity> userFilterOperation,
            JwtProperties jwtProperties
    ) {
        return new UserServiceImpl(
                userRepository,
                userRoleRepository,
                authenticatedUserDataService,
                modelMapper,
                passwordEncoder,
                rabbitTemplate,
                new FilterSpecificationBuilder<>(userFilterOperation),
                jwtProperties
        );
    }

    @Bean
    public ResetPasswordService resetPasswordService(
            UserRepository userRepository,
            ApplicationEventPublisher eventPublisher,
            PasswordEncoder passwordEncoder,
            RabbitTemplate rabbitTemplate
    ) {
        return new ResetPasswordServiceImpl(userRepository, eventPublisher, passwordEncoder, rabbitTemplate);
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
    public ResetPasswordController resetPasswordController(
            RabbitTemplate rabbitTemplate,
            ResetPasswordService resetPasswordService,
            UserServiceProperties userServiceProperties
    ) {
        return new ResetPasswordController(rabbitTemplate, resetPasswordService, userServiceProperties);
    }

    @Bean
    public UserServiceProperties userServiceProperties() {
        return new UserServiceProperties();
    }

    @Bean
    public RegistrationController registrationController(
            UserService userService,
            ApplicationEventPublisher eventPublisher,
            RabbitTemplate rabbitTemplate,
            UserServiceProperties userServiceProperties
    ) {
        return new RegistrationController(userService, eventPublisher, rabbitTemplate, userServiceProperties);
    }

    @Bean
    public RegistrationCompleteListener registrationListener(
            RabbitTemplate rabbitTemplate,
            UserServiceProperties userServiceProperties
    ) {
        return new RegistrationCompleteListener(rabbitTemplate, userServiceProperties);
    }

    @Bean
    public ResendRegistrationConfirmTokenListener resendRegistrationConfirmTokenListener(
            RabbitTemplate rabbitTemplate,
            UserServiceProperties userServiceProperties
    ) {
        return new ResendRegistrationConfirmTokenListener(rabbitTemplate, userServiceProperties);
    }

    @Bean
    public SendResetPasswordEmailListener sendResetPasswordEmailListener(
            RabbitTemplate rabbitTemplate,
            UserServiceProperties userServiceProperties
    ) {
        return new SendResetPasswordEmailListener(rabbitTemplate, userServiceProperties);
    }

    @Bean
    public UserRoleController userRoleController(UserRoleService userRoleService) {
        return new UserRoleController(userRoleService);
    }

    @Bean
    public UserListener userListener(UserService userService) {
        return new UserListener(userService);
    }
}
