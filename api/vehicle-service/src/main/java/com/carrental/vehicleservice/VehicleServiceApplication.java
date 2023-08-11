package com.carrental.vehicleservice;

import com.carrental.commons.config.AuthenticationServiceConfig;
import com.carrental.commons.config.ModelMapperConfig;
import com.carrental.commons.config.RabbitMQConfig;
import com.carrental.commons.config.SpringFoxConfig;
import com.carrental.vehicleservice.config.VehicleServiceCoreConfig;
import com.carrental.vehicleservice.config.security.WebSecurityConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.web.servlet.support.SpringBootServletInitializer;
import org.springframework.context.annotation.Import;
import org.springframework.web.WebApplicationInitializer;

@SpringBootApplication
@Import({
        AuthenticationServiceConfig.class,
        ModelMapperConfig.class,
        SpringFoxConfig.class,
        VehicleServiceCoreConfig.class,
        WebSecurityConfig.class,
        RabbitMQConfig.class
})
public class VehicleServiceApplication extends SpringBootServletInitializer implements WebApplicationInitializer {

    public static void main(String[] args) {
        SpringApplication.run(VehicleServiceApplication.class, args);
    }
}