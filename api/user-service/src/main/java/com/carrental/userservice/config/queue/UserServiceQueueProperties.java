package com.carrental.userservice.config.queue;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "car-rental.user-service.queue")
public class UserServiceQueueProperties {

    @NotNull
    private String getUserByEmailQueue;

    public String getGetUserByEmailQueue() {
        return getUserByEmailQueue;
    }

    public void setGetUserByEmailQueue(String getUserByEmailQueue) {
        this.getUserByEmailQueue = getUserByEmailQueue;
    }
}
