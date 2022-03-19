package com.carrental.bookingservice.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Entity(name = "bookings")
@Table(name = "Bookings")
public class BookingEntity implements Serializable {

  @Id
  @Column(name = "ID", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "userID", nullable = false)
  private Long userId;

  @Column(name = "vehicleID", nullable = false)
  private Long vehicleId;

  @Column(name = "receiptDate", nullable = false)
  private LocalDateTime receiptDate;

  @Column(name = "returnDate", nullable = false)
  private LocalDateTime returnDate;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "locationID", referencedColumnName = "ID", nullable = false)
  private LocationEntity location;

  @ManyToOne(cascade = CascadeType.ALL)
  @JoinColumn(name = "bookingStateCode", referencedColumnName = "bookingCode", nullable = false)
  private BookingStateEntity bookingStateCode;

  @Column(name = "totalCost", nullable = false)
  private BigDecimal totalCost;
}
