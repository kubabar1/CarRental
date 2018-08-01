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
@Table(name = "Comments")
public class Comments implements Serializable {

	@Id
	@Column(name = "")
	private Long ID;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "vehicleID")
	@Column(name = "vehicleID")
	private Vehicle vehicleID;

	@Column(name = "commentContent")
	private String commentContent;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "authorID")
	@Column(name = "authorID")
	private User authorID;

	@Column(name = "creationDate")
	private Date creationDate;

	public Comments() {
		super();
	}

	public Comments(Vehicle vehicleID, String commentContent, User authorID, Date creationDate) {
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

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creationDate) {
		this.creationDate = creationDate;
	}

	@Override
	public String toString() {
		return "Comments [ID=" + ID + ", vehicleID=" + vehicleID + ", commentContent=" + commentContent + ", authorID="
				+ authorID + ", creationDate=" + creationDate + "]";
	}

}
