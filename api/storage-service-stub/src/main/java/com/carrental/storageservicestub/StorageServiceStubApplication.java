package com.carrental.storageservicestub;

import com.carrental.commons.config.rabbitmq.RabbitMQConfig;
import com.carrental.storageservicestub.config.StorageServiceStubCoreConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.security.servlet.SecurityAutoConfiguration;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Import;

@Import({
    StorageServiceStubCoreConfig.class,
    RabbitMQConfig.class
})
@SpringBootApplication(exclude = SecurityAutoConfiguration.class)
@EnableFeignClients
public class StorageServiceStubApplication {

    public static void main(String[] args) {
        SpringApplication.run(StorageServiceStubApplication.class, args);
    }
}