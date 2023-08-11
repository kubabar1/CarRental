package com.carrental.authservice.config.queue;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;

import static com.carrental.commons.amqp.utils.QueueConfig.buildQueue;

public class AuthServiceQueueConfig {

    @Bean
    public Queue generateTokenQueue() {
        return buildQueue("generateTokenQueue");
    }

    @Bean
    public Queue getTokenQueue() {
        return buildQueue("getTokenQueue");
    }

    @Bean
    public Queue deleteTokenQueue() {
        return buildQueue("deleteTokenQueue");
    }
}
