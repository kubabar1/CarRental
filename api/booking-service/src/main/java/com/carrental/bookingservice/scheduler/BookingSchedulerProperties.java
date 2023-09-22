package com.carrental.bookingservice.scheduler;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "car-rental.booking-service.booking-scheduler")
public class BookingSchedulerProperties {

    @NotNull
    private boolean cancelExpiredBookingEnabled;

    @NotNull
    private String cancelExpiredBookingCron;

    public boolean isCancelExpiredBookingEnabled() {
        return cancelExpiredBookingEnabled;
    }

    public void setCancelExpiredBookingEnabled(boolean cancelExpiredBookingEnabled) {
        this.cancelExpiredBookingEnabled = cancelExpiredBookingEnabled;
    }

    public String getCancelExpiredBookingCron() {
        return cancelExpiredBookingCron;
    }

    public void setCancelExpiredBookingCron(String cancelExpiredBookingCron) {
        this.cancelExpiredBookingCron = cancelExpiredBookingCron;
    }
}
