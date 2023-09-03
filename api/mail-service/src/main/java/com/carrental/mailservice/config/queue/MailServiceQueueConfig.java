package com.carrental.mailservice.config.queue;

import com.carrental.commons.amqp.utils.RabbitMqUtil;
import org.springframework.amqp.core.Declarables;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;

import javax.inject.Inject;

public class MailServiceQueueConfig {

    @Inject
    private DirectExchange rabbitMqExchange;

    @Inject
    private DirectExchange rabbitMqDeadLetterExchange;

    @Inject
    private Queue dlqDefaultQueue;

    @Bean
    public MailServiceQueueProperties mailServiceQueueProperties() {
        return new MailServiceQueueProperties();
    }

    @Bean
    public Declarables sendEmailQueue(MailServiceQueueProperties mailServiceQueueProperties) {
        return RabbitMqUtil.buildQueue(mailServiceQueueProperties.getSendEmailQueue(), dlqDefaultQueue, rabbitMqExchange, rabbitMqDeadLetterExchange);
    }

    @Bean
    public Declarables sendMultipleEmailsQueue(MailServiceQueueProperties mailServiceQueueProperties) {
        return RabbitMqUtil.buildQueue(mailServiceQueueProperties.getSendMultipleEmailsQueue(), dlqDefaultQueue, rabbitMqExchange, rabbitMqDeadLetterExchange);
    }
}
