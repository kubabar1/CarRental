package com.carrental.model;

import java.io.Serializable;
import java.sql.Date;
import java.sql.Timestamp;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

@Entity
@Table(name = "Comments")
public class Comment implements Serializable {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "ID")
	private Long id;

	@Column(name = "vehicleID")
	private Long vehicleId;

	@Column(name = "commentContent")
	private String commentContent;

	@Column(name = "login")
	private String login;

	@JsonFormat(pattern = "yyyy-MM-dd HH:mm:ss")
	@Column(name = "creationDate")
	private Timestamp creationDate;

	@Column(name = "rating")
	private Integer rating;

	@JsonIgnore
	@ManyToOne(optional = false)
	@JoinColumn(name = "vehicleId", referencedColumnName = "ID", insertable = false, updatable = false)
	private Vehicle vehicle;

	public Comment() {
		super();
	}

	public Comment(Vehicle vehicle, String commentContent, String login, Timestamp creationDate) {
		super();
		this.vehicle = vehicle;
		this.commentContent = commentContent;
		this.login = login;
		this.creationDate = creationDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public Timestamp getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Timestamp creationDate) {
		this.creationDate = creationDate;
	}

	public Vehicle getVehicle() {
		return vehicle;
	}

	public void setVehicle(Vehicle vehicle) {
		this.vehicle = vehicle;
	}

	public Long getVehicleId() {
		return vehicleId;
	}

	public void setVehicleId(Long vehicleId) {
		this.vehicleId = vehicleId;
	}

	public Integer getRating() {
		return rating;
	}

	public void setRating(Integer rating) {
		this.rating = rating;
	}

	@Override
	public String toString() {
		return "Comment [id=" + id + ", vehicleId=" + vehicleId + ", commentContent=" + commentContent + ", login="
				+ login + ", creationDate=" + creationDate + ", rating=" + rating + ", vehicle=" + vehicle + "]";
	}

}
