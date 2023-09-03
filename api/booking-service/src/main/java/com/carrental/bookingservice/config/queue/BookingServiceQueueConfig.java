package com.carrental.bookingservice.config.queue;

import com.carrental.commons.amqp.utils.RabbitMqUtil;
import org.springframework.amqp.core.Declarables;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;

import javax.inject.Inject;


public class BookingServiceQueueConfig {

    @Inject
    private DirectExchange rabbitMqExchange;

    @Inject
    private DirectExchange rabbitMqDeadLetterExchange;

    @Inject
    private Queue dlqDefaultQueue;

    @Bean
    public BookingServiceQueueProperties bookingServiceQueueProperties() {
        return new BookingServiceQueueProperties();
    }

    @Bean
    public Declarables getBookedVehiclesIdsQueue(BookingServiceQueueProperties bookingServiceQueueProperties) {
        return RabbitMqUtil.buildQueue(bookingServiceQueueProperties.getGetBookedVehiclesIdsQueue(), dlqDefaultQueue, rabbitMqExchange, rabbitMqDeadLetterExchange);
    }

    @Bean
    public Declarables getLocationByIdQueue(BookingServiceQueueProperties bookingServiceQueueProperties) {
        return RabbitMqUtil.buildQueue(bookingServiceQueueProperties.getGetLocationByIdQueue(), dlqDefaultQueue, rabbitMqExchange, rabbitMqDeadLetterExchange);
    }

    @Bean
    public Declarables getLocationQueue(BookingServiceQueueProperties bookingServiceQueueProperties) {
        return RabbitMqUtil.buildQueue(bookingServiceQueueProperties.getGetLocationQueue(), dlqDefaultQueue, rabbitMqExchange, rabbitMqDeadLetterExchange);
    }
}
