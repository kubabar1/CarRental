package com.carrental.setup;

import com.carrental.authservice.config.AuthServiceCoreConfig;
import com.carrental.bookingservice.config.BookingServiceCoreConfig;
import com.carrental.ratingservice.config.RatingServiceCoreConfig;
import com.carrental.userservice.config.UserServiceCoreConfig;
import com.carrental.vehicleservice.config.VehicleServiceCoreConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@SpringBootApplication(
        scanBasePackages = {
                "com.carrental.bookingservice",
                "com.carrental.ratingservice",
                "com.carrental.userservice",
                "com.carrental.vehicleservice",
                "com.carrental.authservice"
        }
)
@Import({
        BookingServiceCoreConfig.class,
        RatingServiceCoreConfig.class,
        UserServiceCoreConfig.class,
        VehicleServiceCoreConfig.class,
        AuthServiceCoreConfig.class
})
public class SetupApplication {

    public static void main(String[] args) {
        SpringApplication.run(SetupApplication.class, args);
    }
}
