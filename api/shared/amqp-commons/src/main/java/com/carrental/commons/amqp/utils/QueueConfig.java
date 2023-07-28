package com.carrental.commons.amqp.utils;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.QueueBuilder;

public class QueueConfig {

    public static Queue buildQueue(String queueName) {
        return QueueBuilder
                .nonDurable(queueName)
                .autoDelete()
//                .withArgument("x-dead-letter-exchange", "")
//                .withArgument("x-dead-letter-routing-key", "getTokenQueueDLQ")
                .build();
    }
}
