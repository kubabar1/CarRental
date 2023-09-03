package com.carrental.storageservicestub.config.queue;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "car-rental.storage-service-stub.queue")
public class StorageServiceStubQueueProperties {

    @NotNull
    private String getUploadVehicleImageQueue;

    public String getGetUploadVehicleImageQueue() {
        return getUploadVehicleImageQueue;
    }

    public void setGetUploadVehicleImageQueue(String getUploadVehicleImageQueue) {
        this.getUploadVehicleImageQueue = getUploadVehicleImageQueue;
    }
}
