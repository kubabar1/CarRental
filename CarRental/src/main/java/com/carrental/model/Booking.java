package com.carrental.model;

import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

@Entity
@Table(name = "Bookings")
public class Booking implements Serializable {

	@Id
	@Column(name = "ID")
	private Long id;

	@Column(name = "userID")
	private Long userID;

	@Column(name = "vehicleID")
	private Long vehicleID;

	@Column(name = "locationID")
	private Long locationID;

	@JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@Column(name = "receiptDate")
	private LocalDateTime receiptDate;

	@JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@Column(name = "returnDate")
	private LocalDateTime returnDate;

	@Column(name = "bookingStateCode")
	private BookingStateCode bookingStateCode;

	@JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@Column(name = "rentDate")
	private LocalDateTime rentDate;

	@JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@Column(name = "returnRentedVehicleDate")
	private LocalDateTime returnRentedVehicleDate;

	@Column(name = "rentingEmployee")
	private Long rentingEmployee;

	public Booking() {
		super();
	}

	public Booking(Long userID, Long vehicleID, Long locationID, LocalDateTime receiptDate, LocalDateTime returnDate,
			BookingStateCode bookingStateCode, LocalDateTime rentDate, LocalDateTime returnRentedVehicleDate,
			Long rentingEmployee) {
		super();
		this.userID = userID;
		this.vehicleID = vehicleID;
		this.locationID = locationID;
		this.receiptDate = receiptDate;
		this.returnDate = returnDate;
		this.bookingStateCode = bookingStateCode;
		this.rentDate = rentDate;
		this.returnRentedVehicleDate = returnRentedVehicleDate;
		this.rentingEmployee = rentingEmployee;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserID() {
		return userID;
	}

	public void setUserID(Long userID) {
		this.userID = userID;
	}

	public Long getVehicleID() {
		return vehicleID;
	}

	public void setVehicleID(Long vehicleID) {
		this.vehicleID = vehicleID;
	}

	public Long getLocationID() {
		return locationID;
	}

	public void setLocationID(Long locationID) {
		this.locationID = locationID;
	}

	public LocalDateTime getReceiptDate() {
		return receiptDate;
	}

	public void setReceiptDate(LocalDateTime receiptDate) {
		this.receiptDate = receiptDate;
	}

	public LocalDateTime getReturnDate() {
		return returnDate;
	}

	public void setReturnDate(LocalDateTime returnDate) {
		this.returnDate = returnDate;
	}

	public BookingStateCode getBookingStateCode() {
		return bookingStateCode;
	}

	public void setBookingStateCode(BookingStateCode bookingStateCode) {
		this.bookingStateCode = bookingStateCode;
	}

	public LocalDateTime getRentDate() {
		return rentDate;
	}

	public void setRentDate(LocalDateTime rentDate) {
		this.rentDate = rentDate;
	}

	public LocalDateTime getReturnRentedVehicleDate() {
		return returnRentedVehicleDate;
	}

	public void setReturnRentedVehicleDate(LocalDateTime returnRentedVehicleDate) {
		this.returnRentedVehicleDate = returnRentedVehicleDate;
	}

	public Long getRentingEmployee() {
		return rentingEmployee;
	}

	public void setRentingEmployee(Long rentingEmployee) {
		this.rentingEmployee = rentingEmployee;
	}

	@Override
	public String toString() {
		return "Booking [id=" + id + ", userID=" + userID + ", vehicleID=" + vehicleID + ", locationID=" + locationID
				+ ", receiptDate=" + receiptDate + ", returnDate=" + returnDate + ", bookingStateCode="
				+ bookingStateCode + ", rentDate=" + rentDate + ", returnRentedVehicleDate=" + returnRentedVehicleDate
				+ ", rentingEmployee=" + rentingEmployee + "]";
	}

}
