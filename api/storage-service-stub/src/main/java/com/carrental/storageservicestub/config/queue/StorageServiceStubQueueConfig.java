package com.carrental.storageservicestub.config.queue;

import com.carrental.commons.amqp.utils.RabbitMqUtil;
import org.springframework.amqp.core.Declarables;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;

import javax.inject.Inject;


public class StorageServiceStubQueueConfig {

    @Inject
    private DirectExchange rabbitMqExchange;

    @Inject
    private DirectExchange rabbitMqDeadLetterExchange;

    @Inject
    private Queue dlqDefaultQueue;

    @Bean
    public Declarables getUploadVehicleImageQueue(StorageServiceStubQueueProperties storageServiceStubQueueProperties) {
        return RabbitMqUtil.buildQueue(storageServiceStubQueueProperties.getGetUploadVehicleImageQueue(), dlqDefaultQueue, rabbitMqExchange, rabbitMqDeadLetterExchange);
    }

    @Bean
    public StorageServiceStubQueueProperties storageServiceStubQueueProperties() {
        return new StorageServiceStubQueueProperties();
    }
}
