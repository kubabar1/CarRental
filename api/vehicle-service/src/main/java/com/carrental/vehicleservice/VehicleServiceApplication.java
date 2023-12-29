package com.carrental.vehicleservice;

import com.carrental.commons.config.AuthenticationServiceConfig;
import com.carrental.commons.config.ModelMapperConfig;
import com.carrental.commons.config.rabbitmq.RabbitMQConfig;
import com.carrental.commons.config.SpringFoxConfig;
import com.carrental.vehicleservice.config.VehicleServiceCoreConfig;
import com.carrental.vehicleservice.config.security.WebSecurityConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.openfeign.EnableFeignClients;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import({
        AuthenticationServiceConfig.class,
        ModelMapperConfig.class,
        SpringFoxConfig.class,
        VehicleServiceCoreConfig.class,
        WebSecurityConfig.class,
        RabbitMQConfig.class
})
@EnableFeignClients
public class VehicleServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(VehicleServiceApplication.class, args);
    }
}