package com.carrental.model;

import java.io.Serializable;
import java.sql.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "ChangesBookings")
public class ChangesBooking implements Serializable {

	@Id
	@Column(name = "ID")
	private Long ID;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "bookingID")
	@Column(name = "bookingID")
	private Booking bookingID;

	@Column(name = "changesDate")
	private Date changesDate;

	@Column(name = "who")
	private String who;

	@Column(name = "PC")
	private String PC;

	public ChangesBooking() {
		super();
	}

	public ChangesBooking(Booking bookingID, Date changesDate, String who, String pC) {
		super();
		this.bookingID = bookingID;
		this.changesDate = changesDate;
		this.who = who;
		PC = pC;
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public Booking getBookingID() {
		return bookingID;
	}

	public void setBookingID(Booking bookingID) {
		this.bookingID = bookingID;
	}

	public Date getChangesDate() {
		return changesDate;
	}

	public void setChangesDate(Date changesDate) {
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
		return "ChangesBooking [ID=" + ID + ", bookingID=" + bookingID + ", changesDate=" + changesDate + ", who=" + who
				+ ", PC=" + PC + "]";
	}

}
