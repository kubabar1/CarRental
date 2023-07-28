package com.carrental.ratingservice.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;

import static com.carrental.commons.amqp.utils.QueueConfig.buildQueue;

public class RatingServiceQueueConfig {

    @Bean
    public Queue getAverageVehiclesRatingQueue() {
        return buildQueue("getAverageVehiclesRatingQueue");
    }
}
