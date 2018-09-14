package com.carrental.model;

import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

@Entity
@Table(name = "ChangesBookings")
public class ChangesBooking implements Serializable {

	@Id
	@Column(name = "ID")
	private Long id;

	@Column(name = "bookingID")
	private Long bookingId;

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "changesDate")
	private LocalDateTime changesDate;

	@Column(name = "who")
	private String who;

	@Column(name = "PC")
	private String PC;

	public ChangesBooking() {
		super();
	}

	public ChangesBooking(Long bookingId, LocalDateTime changesDate, String who, String pC) {
		super();
		this.bookingId = bookingId;
		this.changesDate = changesDate;
		this.who = who;
		PC = pC;
	}

	public Long getId() {
		return id;
	}

	public void setID(Long id) {
		this.id = id;
	}

	public Long getBookingId() {
		return bookingId;
	}

	public void setBookingId(Long bookingId) {
		this.bookingId = bookingId;
	}

	public LocalDateTime getChangesDate() {
		return changesDate;
	}

	public void setChangesDate(LocalDateTime changesDate) {
		this.changesDate = changesDate;
	}

	public String getWho() {
		return who;
	}

	public void setWho(String who) {
		this.who = who;
	}

	public String getPC() {
		return PC;
	}

	public void setPC(String pC) {
		PC = pC;
	}

	@Override
	public String toString() {
		return "ChangesBooking [id=" + id + ", bookingId=" + bookingId + ", changesDate=" + changesDate + ", who=" + who
				+ ", PC=" + PC + "]";
	}

}
