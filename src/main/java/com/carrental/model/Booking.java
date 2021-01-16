package com.carrental.model;

import com.fasterxml.jackson.annotation.JsonFormat;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Timestamp;

@Entity
@Table(name = "Bookings")
public class Booking implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ID")
  private Long id;

  @Column(name = "userID")
  private Long userId;

  @Column(name = "vehicleID")
  private Long vehicleId;

  @Column(name = "locationID")
  private Long locationId;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  @Column(name = "receiptDate")
  private Timestamp receiptDate;

  @JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
  @Column(name = "returnDate")
  private Timestamp returnDate;

  @Column(name = "bookingStateCode")
  private String bookingStateCode;

  @Column(name = "totalCost")
  private BigDecimal totalCost;

  public Booking() {
    super();
  }

  public Booking(
      Long userId,
      Long vehicleId,
      Long locationId,
      Timestamp receiptDate,
      Timestamp returnDate,
      String bookingStateCode,
      BigDecimal totalCost) {
    super();
    this.userId = userId;
    this.vehicleId = vehicleId;
    this.locationId = locationId;
    this.receiptDate = receiptDate;
    this.returnDate = returnDate;
    this.bookingStateCode = bookingStateCode;
    this.totalCost = totalCost;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getUserId() {
    return userId;
  }

  public void setUserId(Long userId) {
    this.userId = userId;
  }

  public Long getVehicleId() {
    return vehicleId;
  }

  public void setVehicleId(Long vehicleId) {
    this.vehicleId = vehicleId;
  }

  public Long getLocationId() {
    return locationId;
  }

  public void setLocationId(Long locationId) {
    this.locationId = locationId;
  }

  public Timestamp getReceiptDate() {
    return receiptDate;
  }

  public void setReceiptDate(Timestamp receiptDate) {
    this.receiptDate = receiptDate;
  }

  public Timestamp getReturnDate() {
    return returnDate;
  }

  public void setReturnDate(Timestamp returnDate) {
    this.returnDate = returnDate;
  }

  public String getBookingStateCode() {
    return bookingStateCode;
  }

  public void setBookingStateCode(String bookingStateCode) {
    this.bookingStateCode = bookingStateCode;
  }

  public BigDecimal getTotalCost() {
    return totalCost;
  }

  public void setTotalCost(BigDecimal totalCost) {
    this.totalCost = totalCost;
  }

  @Override
  public String toString() {
    return "Booking [id="
        + id
        + ", userId="
        + userId
        + ", vehicleId="
        + vehicleId
        + ", locationId="
        + locationId
        + ", receiptDate="
        + receiptDate
        + ", returnDate="
        + returnDate
        + ", bookingStateCode="
        + bookingStateCode
        + ", totalCost="
        + totalCost
        + "]";
  }
}
