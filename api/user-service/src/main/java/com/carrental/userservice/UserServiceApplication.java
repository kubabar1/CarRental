package com.carrental.userservice;

import com.carrental.commons.config.AuthenticationServiceConfig;
import com.carrental.commons.config.ModelMapperConfig;
import com.carrental.commons.config.rabbitmq.RabbitMQConfig;
import com.carrental.commons.config.SpringFoxConfig;
import com.carrental.userservice.config.security.WebSecurityConfig;
import com.carrental.userservice.config.UserServiceCoreConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Import;

@Import({
        AuthenticationServiceConfig.class,
        ModelMapperConfig.class,
        SpringFoxConfig.class,
        UserServiceCoreConfig.class,
        WebSecurityConfig.class,
        RabbitMQConfig.class
})
@SpringBootApplication
@EnableFeignClients
public class UserServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}
