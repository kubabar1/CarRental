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

import com.fasterxml.jackson.annotation.JsonIgnore;

@Entity
@Table(name = "Vehicles")
public class Vehicle implements Serializable {

	@Id
	@Column(name = "ID")
	private Long id;

	@Column(name = "registration")
	private String registration;

	@Column(name = "brand")
	private String brand;

	@Column(name = "model")
	private String model;

	@Column(name = "dailyFee")
	private BigDecimal dailyFee;

	@Column(name = "locationID")
	private String locationId;

	@Column(name = "vehicleStatus")
	private String vehicleStatus;

	@Column(name = "bestOffer")
	private Boolean bestOffer;

	@JsonIgnore
	@OneToMany(mappedBy = "vehicleID")
	private List<Stars> starsList = new ArrayList<Stars>();

	@JsonIgnore
	@OneToMany(mappedBy = "vehicleID")
	private List<Comment> commentsList = new ArrayList<Comment>();

	@JsonIgnore
	@ManyToMany(mappedBy = "carList")
	private List<Equipment> equipmentList = new ArrayList<Equipment>();

	@OneToOne(mappedBy = "vehicle")
	private VehicleParameters vehicleParameters;

	public Vehicle() {
		super();
	}

	public Vehicle(String registration, String brand, String model, BigDecimal dailyFee, String locationId,
			String vehicleStatus, List<Stars> starsList, List<Comment> commentsList, List<Equipment> equipmentList,
			VehicleParameters vehicleParameters) {
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
		this.vehicleParameters = vehicleParameters;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
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

	public String getVehicleStatus() {
		return vehicleStatus;
	}

	public void setVehicleStatus(String vehicleStatus) {
		this.vehicleStatus = vehicleStatus;
	}

	public List<Equipment> getEquipmentList() {
		return equipmentList;
	}

	public void setEquipmentList(List<Equipment> equipmentList) {
		this.equipmentList = equipmentList;
	}

	public String getLocationId() {
		return locationId;
	}

	public void setLocationId(String locationId) {
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

	public List<Comment> getCommentsList() {
		return commentsList;
	}

	public void setCommentsList(List<Comment> commentsList) {
		this.commentsList = commentsList;
	}

	public Boolean getBestOffer() {
		return bestOffer;
	}

	public void setBestOffer(Boolean bestOffer) {
		this.bestOffer = bestOffer;
	}

	@Override
	public String toString() {
		return "Vehicle [ID=" + id + ", registration=" + registration + ", brand=" + brand + ", model=" + model
				+ ", dailyFee=" + dailyFee + ", locationId=" + locationId + ", vehicleStatus=" + vehicleStatus + "]";
	}

}
