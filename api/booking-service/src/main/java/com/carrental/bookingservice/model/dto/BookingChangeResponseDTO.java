package com.carrental.bookingservice.model.dto;

import lombok.Data;

@Data
public class BookingChangeResponseDTO {

  private String id;

  private Long bookingId;

  private Long userId;

  private String changeDate;

  private String ipAddress;
}
