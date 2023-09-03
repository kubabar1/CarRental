package com.carrental.commons.amqp.utils;

import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.Declarables;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.core.ParameterizedTypeReference;

import java.util.Map;

public final class RabbitMqUtil {

    public static Declarables buildQueue(String queueName, Queue dlqQueue, DirectExchange rabbitMqExchange, DirectExchange rabbitMqDeadLetterExchange) {
        Queue queue = new Queue(queueName, false, false, true, Map.of(
            "x-dead-letter-exchange", rabbitMqDeadLetterExchange.getName(),
            "x-dead-letter-routing-key", dlqQueue.getName()
        ));
        return new Declarables(
            queue,
            BindingBuilder.bind(queue).to(rabbitMqExchange).with(queueName)
        );
    }
}
