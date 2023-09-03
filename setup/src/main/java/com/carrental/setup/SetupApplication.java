package com.carrental.setup;

import com.carrental.authservice.config.AuthServiceCoreConfig;
import com.carrental.bookingservice.config.BookingServiceCoreConfig;
import com.carrental.commons.config.AuthenticationServiceConfig;
import com.carrental.commons.config.rabbitmq.RabbitMQConfig;
import com.carrental.mailservice.config.MailServiceCoreConfig;
import com.carrental.ratingservice.config.RatingServiceCoreConfig;
import com.carrental.storageservicestub.StorageServiceStubApplication;
import com.carrental.userservice.config.UserServiceCoreConfig;
import com.carrental.vehicleservice.config.VehicleServiceCoreConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;
import com.carrental.commons.config.ModelMapperConfig;
import com.carrental.commons.config.SpringFoxConfig;

@SpringBootApplication
@Import({
        BookingServiceCoreConfig.class,
        RatingServiceCoreConfig.class,
        UserServiceCoreConfig.class,
        VehicleServiceCoreConfig.class,
        AuthServiceCoreConfig.class,
        MailServiceCoreConfig.class,
        StorageServiceStubApplication.class,
        AuthenticationServiceConfig.class,
        ModelMapperConfig.class,
        SpringFoxConfig.class,
        RabbitMQConfig.class
})
public class SetupApplication {

    public static void main(String[] args) {
        SpringApplication.run(SetupApplication.class, args);
    }
}
