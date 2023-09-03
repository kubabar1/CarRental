package com.carrental.ratingservice.config.queue;

import com.carrental.commons.amqp.utils.RabbitMqUtil;
import org.springframework.amqp.core.Declarables;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;

import javax.inject.Inject;


public class RatingServiceQueueConfig {

    @Inject
    private DirectExchange rabbitMqExchange;

    @Inject
    private DirectExchange rabbitMqDeadLetterExchange;

    @Inject
    private Queue dlqDefaultQueue;

    @Bean
    public Declarables getAverageVehiclesRatingQueue(RatingServiceQueueProperties ratingServiceQueueProperties) {
        return RabbitMqUtil.buildQueue(ratingServiceQueueProperties.getGetAverageVehiclesRatingQueue(), dlqDefaultQueue, rabbitMqExchange, rabbitMqDeadLetterExchange);
    }

    @Bean
    public RatingServiceQueueProperties ratingServiceQueueProperties() {
        return new RatingServiceQueueProperties();
    }
}
