package com.carrental.amqpbroker.config;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;
import org.springframework.context.annotation.Bean;

public class QueueConfig {

    @Bean
    public Queue sendEmailQueue() {
        return buildQueue("sendEmailQueue");
    }

    @Bean
    public Queue sendMultipleEmailsQueue() {
        return buildQueue("sendMultipleEmailsQueue");
    }

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

    @Bean
    public Queue getUserByEmailQueue() {
        return buildQueue("getUserByEmailQueue");
    }

    @Bean
    public Queue getAverageVehiclesRatingQueue() {
        return buildQueue("getAverageVehiclesRatingQueue");
    }

    private Queue buildQueue(String queueName) {
        return QueueBuilder
                .nonDurable(queueName)
                .autoDelete()
//                .withArgument("x-dead-letter-exchange", "")
//                .withArgument("x-dead-letter-routing-key", "getTokenQueueDLQ")
                .build();
    }
}
