package com.carrental.ratingservice;

import com.carrental.commons.config.AuthenticationServiceConfig;
import com.carrental.commons.config.ModelMapperConfig;
import com.carrental.commons.config.rabbitmq.RabbitMQConfig;
import com.carrental.commons.config.SpringFoxConfig;
import com.carrental.ratingservice.config.RatingServiceCoreConfig;
import com.carrental.ratingservice.config.security.WebSecurityConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Import;

@Import({
        AuthenticationServiceConfig.class,
        ModelMapperConfig.class,
        SpringFoxConfig.class,
        RatingServiceCoreConfig.class,
        WebSecurityConfig.class,
        RabbitMQConfig.class
})
@SpringBootApplication
@EnableFeignClients
public class RatingServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(RatingServiceApplication.class, args);
    }
}
