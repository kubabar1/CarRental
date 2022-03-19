package com.carrental.bookingservice.model.dto;

import com.carrental.bookingservice.model.constants.BookingStateCodeEnum;
import lombok.Data;

@Data
public class BookingStateDTO {

  private BookingStateCodeEnum bookingCode;

  private String description;
}
