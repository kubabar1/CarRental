package com.carrental.mailservice.config.queue;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "car-rental.mail-service.queue")
public class MailServiceQueueProperties {

    @NotNull
    private String sendEmailQueue;

    @NotNull
    private String sendMultipleEmailsQueue;

    public String getSendEmailQueue() {
        return sendEmailQueue;
    }

    public void setSendEmailQueue(String sendEmailQueue) {
        this.sendEmailQueue = sendEmailQueue;
    }

    public String getSendMultipleEmailsQueue() {
        return sendMultipleEmailsQueue;
    }

    public void setSendMultipleEmailsQueue(String sendMultipleEmailsQueue) {
        this.sendMultipleEmailsQueue = sendMultipleEmailsQueue;
    }
}
