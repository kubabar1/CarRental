package com.carrental.model;

import java.io.Serializable;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "BookingStateCodes;")
public class BookingStateCode implements Serializable {

	@Id
	@Column(name = "bookingCode")
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "bookingCode")
	private String bookingCode;

	@Column(name = "description")
	private String description;

	public BookingStateCode() {
		super();
	}

	public BookingStateCode(String bookingCode, String description) {
		super();
		this.bookingCode = bookingCode;
		this.description = description;
	}

	public String getBookingCode() {
		return bookingCode;
	}

	public void setBookingCode(String bookingCode) {
		this.bookingCode = bookingCode;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "BookingStateCode [bookingCode=" + bookingCode + ", description=" + description + "]";
	}

}
