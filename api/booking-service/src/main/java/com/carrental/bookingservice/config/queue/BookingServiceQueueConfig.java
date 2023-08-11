package com.carrental.bookingservice.config.queue;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;

import static com.carrental.commons.amqp.utils.QueueConfig.buildQueue;

public class BookingServiceQueueConfig {

    @Bean
    public Queue getBookedVehiclesIdsQueue() {
        return buildQueue("getBookedVehiclesIdsQueue");
    }

    @Bean
    public Queue getLocationByIdQueue() {
        return buildQueue("getLocationByIdQueue");
    }

    @Bean
    public Queue getLocationQueue() {
        return buildQueue("getLocationQueue");
    }
}
