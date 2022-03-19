package com.carrental.bookingservice.model.entity;

import com.carrental.bookingservice.model.constants.BookingStateCodeEnum;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name = "bookingStates")
@Table(name = "BookingStates")
public class BookingStateEntity implements Serializable {

  @Id
  @Enumerated(EnumType.STRING)
  @Column(name = "bookingCode", nullable = false, length = 3)
  private BookingStateCodeEnum bookingCode;

  @Column(name = "description", nullable = false, length = 50)
  private String description;
}
