package com.carrental.bookingservice.config.queue;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "car-rental.booking-service.queue")
public class BookingServiceQueueProperties {

    @NotNull
    private String getBookedVehiclesIdsQueue;

    @NotNull
    private String getLocationByIdQueue;

    @NotNull
    private String getLocationQueue;

    public String getGetBookedVehiclesIdsQueue() {
        return getBookedVehiclesIdsQueue;
    }

    public void setGetBookedVehiclesIdsQueue(String getBookedVehiclesIdsQueue) {
        this.getBookedVehiclesIdsQueue = getBookedVehiclesIdsQueue;
    }

    public String getGetLocationByIdQueue() {
        return getLocationByIdQueue;
    }

    public void setGetLocationByIdQueue(String getLocationByIdQueue) {
        this.getLocationByIdQueue = getLocationByIdQueue;
    }

    public String getGetLocationQueue() {
        return getLocationQueue;
    }

    public void setGetLocationQueue(String getLocationQueue) {
        this.getLocationQueue = getLocationQueue;
    }
}
