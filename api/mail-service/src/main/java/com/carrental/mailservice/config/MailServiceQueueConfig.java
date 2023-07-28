package com.carrental.mailservice.config;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;

import static com.carrental.commons.amqp.utils.QueueConfig.buildQueue;

public class MailServiceQueueConfig {

    @Bean
    public Queue sendEmailQueue() {
        return buildQueue("sendEmailQueue");
    }

    @Bean
    public Queue sendMultipleEmailsQueue() {
        return buildQueue("sendMultipleEmailsQueue");
    }
}
