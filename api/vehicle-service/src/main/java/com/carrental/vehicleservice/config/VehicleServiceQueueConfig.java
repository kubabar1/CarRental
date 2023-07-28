package com.carrental.vehicleservice.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;

import static com.carrental.commons.amqp.utils.QueueConfig.buildQueue;

public class VehicleServiceQueueConfig {

    @Bean
    public Queue getVehicleById() {
        return buildQueue("getVehicleByIdQueue");
    }
}
