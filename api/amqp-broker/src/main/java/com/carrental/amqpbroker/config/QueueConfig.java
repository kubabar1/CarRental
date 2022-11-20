package com.carrental.amqpbroker.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.context.annotation.Bean;

public class QueueConfig {

    @Bean
    public Queue sendEmailQueue() {
        return new Queue("sendEmailQueue", false, false, true);
    }

    @Bean
    public Queue generateTokenQueue() {
        return new Queue("generateTokenQueue", false, false, true);
    }

    @Bean
    public Queue verifyTokenQueue() {
        return QueueBuilder
                .nonDurable("verifyTokenQueue")
                .autoDelete()
//                .withArgument("x-dead-letter-exchange", "")
//                .withArgument("x-dead-letter-routing-key", "verifyTokenQueueDLQ")
                .build();
    }
}
