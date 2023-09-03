package com.carrental.ratingservice.config.queue;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "car-rental.rating-service.queue")
public class RatingServiceQueueProperties {

    @NotNull
    private String getAverageVehiclesRatingQueue;

    public String getGetAverageVehiclesRatingQueue() {
        return getAverageVehiclesRatingQueue;
    }

    public void setGetAverageVehiclesRatingQueue(String getAverageVehiclesRatingQueue) {
        this.getAverageVehiclesRatingQueue = getAverageVehiclesRatingQueue;
    }
}
