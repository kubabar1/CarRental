package com.carrental.vehicleservice;

import com.carrental.commons.config.AuthenticationServiceConfig;
import com.carrental.commons.config.ModelMapperConfig;
import com.carrental.commons.config.SpringFoxConfig;
import com.carrental.vehicleservice.config.VehicleServiceCoreConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication
@Import({
        AuthenticationServiceConfig.class,
        ModelMapperConfig.class,
        SpringFoxConfig.class,
        VehicleServiceCoreConfig.class
})
public class VehicleServiceApplication {

    public static void main(String[] args) {
        SpringApplication.run(VehicleServiceApplication.class, args);
    }
}