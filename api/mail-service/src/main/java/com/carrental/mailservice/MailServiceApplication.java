package com.carrental.mailservice;

import com.carrental.commons.config.rabbitmq.RabbitMQConfig;
import com.carrental.mailservice.config.MailServiceCoreConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Import;

@Import({
    MailServiceCoreConfig.class,
    RabbitMQConfig.class
})
@SpringBootApplication
@EnableFeignClients
public class MailServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(MailServiceApplication.class, args);
    }
}
