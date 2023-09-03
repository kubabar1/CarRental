package com.carrental.vehicleservice.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "car-rental.vehicle-service")
public class VehicleServiceProperties {

    @NotNull
    private String getBookedVehiclesIdsQueue;

    @NotNull
    private String getLocationByIdQueue;

    @NotNull
    private String getLocationQueue;

    @NotNull
    private String getAverageVehiclesRatingQueue;

    public String getGetBookedVehiclesIdsQueue() {
        return getBookedVehiclesIdsQueue;
    }

    @NotNull
    private String uploadVehicleImageQueue;

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

    public String getGetAverageVehiclesRatingQueue() {
        return getAverageVehiclesRatingQueue;
    }

    public void setGetAverageVehiclesRatingQueue(String getAverageVehiclesRatingQueue) {
        this.getAverageVehiclesRatingQueue = getAverageVehiclesRatingQueue;
    }

    public String getUploadVehicleImageQueue() {
        return uploadVehicleImageQueue;
    }

    public void setUploadVehicleImageQueue(String uploadVehicleImageQueue) {
        this.uploadVehicleImageQueue = uploadVehicleImageQueue;
    }
}
