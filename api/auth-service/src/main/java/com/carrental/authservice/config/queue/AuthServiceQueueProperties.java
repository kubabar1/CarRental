package com.carrental.authservice.config.queue;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "car-rental.auth-service.queue")
public class AuthServiceQueueProperties {

    @NotNull
    private String generateTokenQueue;

    @NotNull
    private String getTokenQueue;

    @NotNull
    private String deleteTokenQueue;

    public String getGenerateTokenQueue() {
        return generateTokenQueue;
    }

    public void setGenerateTokenQueue(String generateTokenQueue) {
        this.generateTokenQueue = generateTokenQueue;
    }

    public String getGetTokenQueue() {
        return getTokenQueue;
    }

    public void setGetTokenQueue(String getTokenQueue) {
        this.getTokenQueue = getTokenQueue;
    }

    public String getDeleteTokenQueue() {
        return deleteTokenQueue;
    }

    public void setDeleteTokenQueue(String deleteTokenQueue) {
        this.deleteTokenQueue = deleteTokenQueue;
    }
}
