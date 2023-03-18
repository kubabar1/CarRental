package com.carrental.bookingservice.model.dto;

import lombok.Data;

import java.math.BigDecimal;

@Data
public class BookingCostResponseDTO {

    private BigDecimal totalCost;
}
