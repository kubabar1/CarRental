package com.carrental.userservice.listener;

import com.carrental.userservice.model.dto.UserDetailsDTO;
import com.carrental.userservice.service.UserService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;

import java.util.NoSuchElementException;

public class UserListener {

    private final UserService userService;

    public UserListener(UserService userService) {
        this.userService = userService;
    }

    @RabbitListener(queues = {"getUserByEmailQueue"})
    public UserDetailsDTO getUserByEmailListener(String email) {
        try {
            return userService.getUserByEmail(email);
        } catch (NoSuchElementException exception) {
            return null;
        }
    }
}
