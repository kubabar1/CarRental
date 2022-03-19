package com.carrental.bookingservice.model.dto;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class BookingResponseDTO {

  private Long id;

  private String userId;

  private String vehicleId;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime receiptDate;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime returnDate;

  private LocationResponseDTO location;

  private BookingStateDTO bookingState;

  private BigDecimal totalCost;
}
