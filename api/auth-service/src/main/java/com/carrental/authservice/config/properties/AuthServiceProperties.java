package com.carrental.authservice.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

@Validated
@ConfigurationProperties(prefix = "car-rental.auth-service")
public class AuthServiceProperties {

    private String getUserByEmailQueue;

    public String getGetUserByEmailQueue() {
        return getUserByEmailQueue;
    }

    public void setGetUserByEmailQueue(String getUserByEmailQueue) {
        this.getUserByEmailQueue = getUserByEmailQueue;
    }
}
