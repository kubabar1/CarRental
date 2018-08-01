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
@Table(name = "VehicleStatus")
public class VehicleStatus implements Serializable {

	@Id
	@Column(name = "vehicleStatusCode")
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "vehicleStatusCode")
	private String vehicleStatusCode;

	@Column(name = "description")
	private String description;

	public VehicleStatus() {
		super();
	}

	public VehicleStatus(String vehicleStatusCode, String description) {
		super();
		this.vehicleStatusCode = vehicleStatusCode;
		this.description = description;
	}

	public String getVehicleStatusCode() {
		return vehicleStatusCode;
	}

	public void setVehicleStatusCode(String vehicleStatusCode) {
		this.vehicleStatusCode = vehicleStatusCode;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	@Override
	public String toString() {
		return "VehicleStatus [vehicleStatusCode=" + vehicleStatusCode + ", description=" + description + "]";
	}

}
