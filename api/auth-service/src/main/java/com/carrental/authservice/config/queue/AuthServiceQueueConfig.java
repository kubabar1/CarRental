package com.carrental.authservice.config.queue;

import com.carrental.commons.amqp.utils.RabbitMqUtil;
import com.carrental.commons.config.rabbitmq.RabbitMQProperties;
import org.springframework.amqp.core.Declarables;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;

import javax.inject.Inject;


public class AuthServiceQueueConfig {

    @Inject
    private DirectExchange rabbitMqExchange;

    @Inject
    private DirectExchange rabbitMqDeadLetterExchange;

    @Inject
    private Queue dlqDefaultQueue;

    @Bean
    public AuthServiceQueueProperties authServiceQueueProperties() {
        return new AuthServiceQueueProperties();
    }

    @Bean
    public Declarables generateTokenQueue(AuthServiceQueueProperties authServiceQueueProperties) {
        return RabbitMqUtil.buildQueue(authServiceQueueProperties.getGenerateTokenQueue(), dlqDefaultQueue, rabbitMqExchange, rabbitMqDeadLetterExchange);
    }

    @Bean
    public Declarables getTokenQueue(AuthServiceQueueProperties authServiceQueueProperties) {
        return RabbitMqUtil.buildQueue(authServiceQueueProperties.getGetTokenQueue(), dlqDefaultQueue, rabbitMqExchange, rabbitMqDeadLetterExchange);
    }

    @Bean
    public Declarables deleteTokenQueue(AuthServiceQueueProperties authServiceQueueProperties) {
        return RabbitMqUtil.buildQueue(authServiceQueueProperties.getDeleteTokenQueue(), dlqDefaultQueue, rabbitMqExchange, rabbitMqDeadLetterExchange);
    }
}
