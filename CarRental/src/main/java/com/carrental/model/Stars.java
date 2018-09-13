package com.carrental.model;

import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.OneToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

@Entity
@Table(name = "Stars")
public class Stars implements Serializable {

	@Id
	@JsonIgnore
	@Column(name = "vehicleID")
	private Long vehicleId;

	@Column(name = "starsAvgCount")
	private Double starsAvgCount;

	@JsonIgnore
	@OneToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "vehicleID")
	private Vehicle vehicle;

	public Stars() {
		super();
	}

	public Stars(Long vehicleId, Double starsAvgCount) {
		super();
		this.vehicleId = vehicleId;
		this.starsAvgCount = starsAvgCount;
	}

	public Long getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(Long vehicleId) {
		this.vehicleId = vehicleId;
	}

	public Double getStarsAvgCount() {
		return starsAvgCount;
	}

	public void setStarsAvgCount(Double starsAvgCount) {
		this.starsAvgCount = starsAvgCount;
	}

	public Vehicle getVehicle() {
		return vehicle;
	}

	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}

	@Override
	public String toString() {
		return "Stars [vehicleId=" + vehicleId + ", starsAvgCount=" + starsAvgCount + ", vehicle=" + vehicle + "]";
	}

}
