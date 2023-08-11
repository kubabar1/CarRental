package com.carrental.storageservicestub.config.queue;

import org.springframework.amqp.core.Queue;
import org.springframework.context.annotation.Bean;

import static com.carrental.commons.amqp.utils.QueueConfig.buildQueue;

public class StorageServiceStubQueueConfig {

    @Bean
    public Queue getUploadVehicleImageQueue() {
        return buildQueue("uploadVehicleImageQueue");
    }
}
