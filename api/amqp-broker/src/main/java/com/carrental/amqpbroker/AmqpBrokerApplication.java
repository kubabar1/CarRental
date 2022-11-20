package com.carrental.amqpbroker;

import com.carrental.amqpbroker.config.AmqpBrokerCoreConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@Import({AmqpBrokerCoreConfig.class})
@SpringBootApplication
public class AmqpBrokerApplication {

    public static void main(String[] args) {
        SpringApplication.run(AmqpBrokerApplication.class, args);
    }
}
