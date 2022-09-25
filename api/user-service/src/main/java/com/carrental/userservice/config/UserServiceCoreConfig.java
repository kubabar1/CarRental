package com.carrental.userservice.config;

import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import com.carrental.userservice.controller.UserController;
import com.carrental.userservice.controller.UserRoleController;
import com.carrental.userservice.repository.UserRepository;
import com.carrental.userservice.repository.UserRoleRepository;
import com.carrental.userservice.service.UserRoleService;
import com.carrental.userservice.service.UserService;
import com.carrental.userservice.service.impl.UserRoleServiceImpl;
import com.carrental.userservice.service.impl.UserServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;

public class UserServiceCoreConfig {

    @Bean
    public UserService userService(
            UserRepository userRepository,
            UserRoleRepository userRoleRepository,
            AuthenticatedUserDataService authenticatedUserDataService,
            ModelMapper modelMapper
    ) {
        return new UserServiceImpl(userRepository, userRoleRepository, authenticatedUserDataService, modelMapper);
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
    public UserRoleController userRoleController(UserRoleService userRoleService) {
        return new UserRoleController(userRoleService);
    }
}
