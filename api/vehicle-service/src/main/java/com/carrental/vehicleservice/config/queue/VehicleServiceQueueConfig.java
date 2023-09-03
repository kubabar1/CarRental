package com.carrental.vehicleservice.config.queue;

import com.carrental.commons.amqp.utils.RabbitMqUtil;
import org.springframework.amqp.core.Declarables;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;

import javax.inject.Inject;


public class VehicleServiceQueueConfig {

    @Inject
    private DirectExchange rabbitMqExchange;

    @Inject
    private DirectExchange rabbitMqDeadLetterExchange;

    @Inject
    private Queue dlqDefaultQueue;

    @Bean
    public VehicleServiceQueueProperties vehicleServiceQueueProperties() {
        return new VehicleServiceQueueProperties();
    }

    @Bean
    public Declarables getVehicleById(VehicleServiceQueueProperties vehicleServiceQueueProperties) {
        return RabbitMqUtil.buildQueue(vehicleServiceQueueProperties.getGetVehicleById(), dlqDefaultQueue, rabbitMqExchange, rabbitMqDeadLetterExchange);
    }
}
