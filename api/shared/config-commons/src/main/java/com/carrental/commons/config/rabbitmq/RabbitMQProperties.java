package com.carrental.commons.config.rabbitmq;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;
import javax.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "car-rental.rabbitmq")
public class RabbitMQProperties {

    @NotNull
    private String exchange;

    @NotNull
    private String dlxExchange;

    @NotNull
    private String dlqDefaultQueue;

    public String getExchange() {
        return exchange;
    }

    public void setExchange(String exchange) {
        this.exchange = exchange;
    }

    public String getDlxExchange() {
        return dlxExchange;
    }

    public void setDlxExchange(String dlxExchange) {
        this.dlxExchange = dlxExchange;
    }

    public String getDlqDefaultQueue() {
        return dlqDefaultQueue;
    }

    public void setDlqDefaultQueue(String dlqDefaultQueue) {
        this.dlqDefaultQueue = dlqDefaultQueue;
    }
}
