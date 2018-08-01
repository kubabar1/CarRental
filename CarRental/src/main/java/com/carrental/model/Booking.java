package com.carrental.model;

import java.io.Serializable;
import java.sql.Date;
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

@Entity
@Table(name = "Bookings")
public class Booking implements Serializable {

	@Id
	@Column(name = "ID")
	private Long ID;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "userID")
	@Column(name = "userID")
	private User userID;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "vehicleID")
	@Column(name = "vehicleID")
	private Vehicle vehicleID;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "locationID")
	@Column(name = "locationID")
	private Location locationID;


	@Column(name = "receiptDate")
	private Date receiptDate;

	@Column(name = "returnDate")
	private Date returnDate;

	@OneToOne(mappedBy = "bookingCode")
	@Column(name = "bookingStateCode")
	private String bookingStateCode;

	@Column(name = "rentDate")
	private Date rentDate;

	@Column(name = "returnRentedVehicleDate")
	private Date returnRentedVehicleDate;

	@Column(name = "rentingEmployee")
	private Long rentingEmployee;

	@OneToMany(mappedBy = "bookingID")
	private List<ChangesBooking> changesBookingList = new ArrayList<ChangesBooking>();

}
