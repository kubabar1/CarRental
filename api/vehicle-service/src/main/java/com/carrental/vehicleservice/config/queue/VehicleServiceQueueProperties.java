package com.carrental.vehicleservice.config.queue;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "car-rental.vehicle-service.queue")
public class VehicleServiceQueueProperties {

    @NotNull
    private String getVehicleById;

    public String getGetVehicleById() {
        return getVehicleById;
    }

    public void setGetVehicleById(String getVehicleById) {
        this.getVehicleById = getVehicleById;
    }
}
