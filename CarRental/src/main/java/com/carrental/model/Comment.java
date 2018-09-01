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
	@Column(name = "ID")
	private Long id;

	@JoinColumn(name = "vehicleID")
	private Long vehicleID;

	@Column(name = "commentContent")
	private String commentContent;

	@JoinColumn(name = "authorID")
	private Long authorID;

	@JsonFormat(pattern = "yyyy-MM-dd hh:mm:ss")
	@JsonSerialize(using = LocalDateTimeSerializer.class)
	@Column(name = "creationDate")
	private LocalDateTime creationDate;

	public Comment() {
		super();
	}

	public Comment(Long vehicleID, String commentContent, Long authorID, LocalDateTime creationDate) {
		super();
		this.vehicleID = vehicleID;
		this.commentContent = commentContent;
		this.authorID = authorID;
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

	public Long getVehicleID() {
		return vehicleID;
	}

	public void setVehicleID(Long vehicleID) {
		this.vehicleID = vehicleID;
	}

	public Long getAuthorID() {
		return authorID;
	}

	public void setAuthorID(Long authorID) {
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
		return "Comments [id=" + id + ", vehicleID=" + vehicleID + ", commentContent=" + commentContent + ", authorID="
				+ authorID + ", creationDate=" + creationDate + "]";
	}

}
