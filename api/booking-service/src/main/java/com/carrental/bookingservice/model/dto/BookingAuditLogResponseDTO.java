package com.carrental.bookingservice.model.dto;

import com.carrental.bookingservice.model.constants.BookingStateCodeEnum;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
public class BookingAuditLogResponseDTO {

  private Long id;

  private Long bookingId;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime receiptDate;

  @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss")
  private LocalDateTime returnDate;

  private BigDecimal totalCost;

  private Long userId;

  private Long vehicleId;

  private BookingStateCodeEnum bookingCode;
}