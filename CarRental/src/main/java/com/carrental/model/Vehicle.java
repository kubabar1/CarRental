package com.carrental.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
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

	@ManyToMany(mappedBy = "carList")
	private List<Equipment> equipmentList = new ArrayList<Equipment>();

	@OneToOne(mappedBy = "vehicle")
	private VehicleParameters vehicleParameters;

	@OneToOne(mappedBy = "vehicle")
	private Stars stars;

	public Vehicle() {
		super();
	}

	public Vehicle(String registration, String brand, String model, BigDecimal dailyFee, String locationId,
			String vehicleStatus, Boolean bestOffer, List<Equipment> equipmentList, VehicleParameters vehicleParameters,
			Stars stars) {
		super();
		this.registration = registration;
		this.brand = brand;
		this.model = model;
		this.dailyFee = dailyFee;
		this.locationId = locationId;
		this.vehicleStatus = vehicleStatus;
		this.bestOffer = bestOffer;
		this.equipmentList = equipmentList;
		this.vehicleParameters = vehicleParameters;
		this.stars = stars;
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

	public String getLocationId() {
		return locationId;
	}

	public void setLocationId(String locationId) {
		this.locationId = locationId;
	}

	public String getVehicleStatus() {
		return vehicleStatus;
	}

	public void setVehicleStatus(String vehicleStatus) {
		this.vehicleStatus = vehicleStatus;
	}

	public Boolean getBestOffer() {
		return bestOffer;
	}

	public void setBestOffer(Boolean bestOffer) {
		this.bestOffer = bestOffer;
	}

	public List<Equipment> getEquipmentList() {
		return equipmentList;
	}

	public void setEquipmentList(List<Equipment> equipmentList) {
		this.equipmentList = equipmentList;
	}

	public VehicleParameters getVehicleParameters() {
		return vehicleParameters;
	}

	public void setVehicleParameters(VehicleParameters vehicleParameters) {
		this.vehicleParameters = vehicleParameters;
	}

	public Stars getStars() {
		return stars;
	}

	public void setStars(Stars stars) {
		this.stars = stars;
	}

	@Override
	public String toString() {
		return "Vehicle [id=" + id + ", registration=" + registration + ", brand=" + brand + ", model=" + model
				+ ", dailyFee=" + dailyFee + ", locationId=" + locationId + ", vehicleStatus=" + vehicleStatus
				+ ", bestOffer=" + bestOffer + ", equipmentList=" + equipmentList + ", vehicleParameters="
				+ vehicleParameters + ", stars=" + stars + "]";
	}

}
