package com.carrental.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Locations")
public class Location implements Serializable {

	@Id
	@Column(name = "ID")
	private Long ID;

	@Column(name = "country")
	private String country;

	@Column(name = "city")
	private String city;

	@Column(name = "addres")
	private String addres;

	@Column(name = "email")
	private String email;

	@Column(name = "phone")
	private String phone;

	@OneToMany(mappedBy = "locationId")
	private List<Vehicle> vehicles = new ArrayList<Vehicle>();

	@OneToMany(mappedBy = "locationId")
	private List<Booking> bookingList = new ArrayList<Booking>();

	public Location() {
		super();
	}

	public Location(String country, String city, String addres, String email, String phone, List<Vehicle> vehicles) {
		super();
		this.country = country;
		this.city = city;
		this.addres = addres;
		this.email = email;
		this.phone = phone;
		this.vehicles = vehicles;
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

	public String getCity() {
		return city;
	}

	public void setCity(String city) {
		this.city = city;
	}

	public String getAddres() {
		return addres;
	}

	public void setAddres(String addres) {
		this.addres = addres;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public List<Vehicle> getVehicles() {
		return vehicles;
	}

	public void setVehicles(List<Vehicle> vehicles) {
		this.vehicles = vehicles;
	}

	@Override
	public String toString() {
		return "Location [ID=" + ID + ", country=" + country + ", city=" + city + ", addres=" + addres + ", email="
				+ email + ", phone=" + phone + "]";
	}

}
