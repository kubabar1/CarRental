package com.carrental.bookingservice.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Entity(name = "bookingsChanges")
@Table(name = "BookingsChanges")
public class BookingChangeEntity implements Serializable {

  @Id
  @Column(name = "ID", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "bookingID", nullable = false)
  private Long bookingId;

  @Column(name = "changeDate", nullable = false)
  private LocalDateTime changeDate;

  @Column(name = "userId", nullable = false)
  private Long userId;

  @Column(name = "ipAddress", nullable = false, length = 100)
  private String ipAddress;
}
