package com.carrental.userservice.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;

import static com.carrental.commons.amqp.utils.QueueConfig.buildQueue;

public class UserServiceQueueConfig {

    @Bean
    public Queue getUserByEmailQueue() {
        return buildQueue("getUserByEmailQueue");
    }
}
