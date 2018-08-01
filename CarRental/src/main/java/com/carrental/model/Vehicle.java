package com.carrental.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.ArrayList;
import java.util.Currency;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToMany;
import javax.persistence.ManyToOne;
import javax.persistence.OneToMany;
import javax.persistence.OneToOne;
import javax.persistence.Table;

@Entity
@Table(name = "Vehicles")
public class Vehicle implements Serializable {

	@Id
	@Column(name = "ID")
	private Long ID;

	@Column(name = "registration")
	private String registration;

	@Column(name = "brand")
	private String brand;

	@Column(name = "model")
	private String model;

	@Column(name = "dailyFee")
	private BigDecimal dailyFee;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "locationID")
	@Column(name = "locationID")
	private Location locationId;

	@Column(name = "vehicleStatus")
	@OneToOne(mappedBy = "vehicleStatusCode")
	private VehicleStatus vehicleStatus;

	@OneToMany(mappedBy = "vehicleID")
	private List<Stars> starsList = new ArrayList<Stars>();

	@OneToMany(mappedBy = "vehicleID")
	private List<Comments> commentsList = new ArrayList<Comments>();

	@ManyToMany(mappedBy = "carList")
	private List<Equipment> equipmentList = new ArrayList<Equipment>();

	@OneToMany(mappedBy = "vehicleID")
	private List<Vehicle> bookingList = new ArrayList<Vehicle>();

	@OneToOne(mappedBy = "vehicleID")
	private VehicleParameters vehicleParameters;

	public Vehicle() {
		super();
	}

	public Vehicle(String registration, String brand, String model, BigDecimal dailyFee, Location locationId,
			VehicleStatus vehicleStatus, List<Stars> starsList, List<Comments> commentsList,
			List<Equipment> equipmentList, List<Vehicle> bookingList, VehicleParameters vehicleParameters) {
		super();
		this.registration = registration;
		this.brand = brand;
		this.model = model;
		this.dailyFee = dailyFee;
		this.locationId = locationId;
		this.vehicleStatus = vehicleStatus;
		this.starsList = starsList;
		this.commentsList = commentsList;
		this.equipmentList = equipmentList;
		this.bookingList = bookingList;
		this.vehicleParameters = vehicleParameters;
	}

	public List<Vehicle> getBookingList() {
		return bookingList;
	}

	public void setBookingList(List<Vehicle> bookingList) {
		this.bookingList = bookingList;
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public String getRegistration() {
		return registration;
	}

	public void setRegistration(String registration) {
		this.registration = registration;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getModel() {
		return model;
	}

	public void setModel(String model) {
		this.model = model;
	}

	public BigDecimal getDailyFee() {
		return dailyFee;
	}

	public void setDailyFee(BigDecimal dailyFee) {
		this.dailyFee = dailyFee;
	}

	public VehicleStatus getVehicleStatus() {
		return vehicleStatus;
	}

	public void setVehicleStatus(VehicleStatus vehicleStatus) {
		this.vehicleStatus = vehicleStatus;
	}

	public List<Equipment> getEquipmentList() {
		return equipmentList;
	}

	public void setEquipmentList(List<Equipment> equipmentList) {
		this.equipmentList = equipmentList;
	}

	public Location getLocationId() {
		return locationId;
	}

	public void setLocationId(Location locationId) {
		this.locationId = locationId;
	}

	public VehicleParameters getVehicleParameters() {
		return vehicleParameters;
	}

	public void setVehicleParameters(VehicleParameters vehicleParameters) {
		this.vehicleParameters = vehicleParameters;
	}

	public List<Stars> getStarsList() {
		return starsList;
	}

	public void setStarsList(List<Stars> starsList) {
		this.starsList = starsList;
	}

	public List<Comments> getCommentsList() {
		return commentsList;
	}

	public void setCommentsList(List<Comments> commentsList) {
		this.commentsList = commentsList;
	}

	@Override
	public String toString() {
		return "Vehicle [ID=" + ID + ", registration=" + registration + ", brand=" + brand + ", model=" + model
				+ ", dailyFee=" + dailyFee + ", locationId=" + locationId + ", vehicleStatus=" + vehicleStatus + "]";
	}

}
