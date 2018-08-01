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
@Table(name = "Stars")
public class Stars implements Serializable {

	@Id
	@Column(name = "ID")
	private Long ID;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "vehicleID")
	@Column(name = "vehicleID")
	private Vehicle vehicleID;

	@Column(name = "starsCount")
	private String starsCount;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "authorID")
	@Column(name = "authorID")
	private User authorID;

	@Column(name = "creationDate")
	private Date creationDate;

	public Stars() {
		super();
	}

	public Stars(Vehicle vehicleID, String starsCount, User authorID, Date creationDate) {
		super();
		this.vehicleID = vehicleID;
		this.starsCount = starsCount;
		this.authorID = authorID;
		this.creationDate = creationDate;
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public String getStarsCount() {
		return starsCount;
	}

	public void setStarsCount(String starsCount) {
		this.starsCount = starsCount;
	}

	public Vehicle getVehicleID() {
		return vehicleID;
	}

	public void setVehicleID(Vehicle vehicleID) {
		this.vehicleID = vehicleID;
	}

	public User getAuthorID() {
		return authorID;
	}

	public void setAuthorID(User authorID) {
		this.authorID = authorID;
	}

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	@Override
	public String toString() {
		return "Stars [ID=" + ID + ", vehicleID=" + vehicleID + ", starsCount=" + starsCount + ", authorID=" + authorID
				+ ", creationDate=" + creationDate + "]";
	}

}
