package com.carrental.bookingservice.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "car-rental.booking-service")
public class BookingServiceProperties {

    @NotNull
    private String getVehicleByIdQueue;

    public String getGetVehicleByIdQueue() {
        return getVehicleByIdQueue;
    }

    public void setGetVehicleByIdQueue(String getVehicleByIdQueue) {
        this.getVehicleByIdQueue = getVehicleByIdQueue;
    }
}
