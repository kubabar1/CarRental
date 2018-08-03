package com.carrental.model;

import java.io.Serializable;
import java.sql.Date;
import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.databind.annotation.JsonSerialize;
import com.fasterxml.jackson.datatype.jsr310.ser.LocalDateTimeSerializer;

@Entity
@Table(name = "Comments")
public class Comment implements Serializable {

	@Id
	@Column(name = "")
	private Long ID;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "vehicleID")
	private Vehicle vehicleID;

	@Column(name = "commentContent")
	private String commentContent;

	@ManyToOne(fetch = FetchType.EAGER)
	@JoinColumn(name = "authorID")
	private User authorID;

	@JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@Column(name = "creationDate")
	private LocalDateTime creationDate;

	public Comment() {
		super();
	}

	public Comment(Vehicle vehicleID, String commentContent, User authorID, LocalDateTime creationDate) {
		super();
		this.vehicleID = vehicleID;
		this.commentContent = commentContent;
		this.authorID = authorID;
		this.creationDate = creationDate;
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public String getCommentContent() {
		return commentContent;
	}

	public void setCommentContent(String commentContent) {
		this.commentContent = commentContent;
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

	public LocalDateTime getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(LocalDateTime creationDate) {
		this.creationDate = creationDate;
	}

	@Override
	public String toString() {
		return "Comments [ID=" + ID + ", vehicleID=" + vehicleID + ", commentContent=" + commentContent + ", authorID="
				+ authorID + ", creationDate=" + creationDate + "]";
	}

}
