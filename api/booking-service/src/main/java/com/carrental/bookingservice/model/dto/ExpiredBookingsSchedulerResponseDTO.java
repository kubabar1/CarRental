package com.carrental.bookingservice.model.dto;

import lombok.Data;

@Data
public class ExpiredBookingsSchedulerResponseDTO {

    private boolean cancelExpiredBookingEnabled;

    private String cancelExpiredBookingCron;
}
