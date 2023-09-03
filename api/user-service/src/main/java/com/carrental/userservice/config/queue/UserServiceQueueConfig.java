package com.carrental.userservice.config.queue;

import com.carrental.commons.amqp.utils.RabbitMqUtil;
import org.springframework.amqp.core.Declarables;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;

import javax.inject.Inject;


public class UserServiceQueueConfig {

    @Inject
    private DirectExchange rabbitMqExchange;

    @Inject
    private DirectExchange rabbitMqDeadLetterExchange;

    @Inject
    private Queue dlqDefaultQueue;

    @Bean
    public Declarables getUserByEmailQueue(UserServiceQueueProperties userServiceQueueProperties) {
        return RabbitMqUtil.buildQueue(userServiceQueueProperties.getGetUserByEmailQueue(), dlqDefaultQueue, rabbitMqExchange, rabbitMqDeadLetterExchange);
    }

    @Bean
    public UserServiceQueueProperties userServiceQueueProperties() {
        return new UserServiceQueueProperties();
    }
}
