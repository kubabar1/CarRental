package com.carrental.model;

import java.io.Serializable;
import java.sql.Date;
import java.util.Currency;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

@Entity
@Table(name = "JobPosition")
public class JobPosition implements Serializable {

	@Id
	@Column(name = "ID")
	private Long ID;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "UserID")
	@Column(name = "UserID")
	private User userID;

	@Column(name = "position")
	private String position;

	@Column(name = "salary")
	private Currency salary;

	@Column(name = "beginWorkDate")
	private Date beginWorkDate;

	@Column(name = "endWorkDate")
	private Date endWorkDate;

	public JobPosition() {
		super();
	}

	public JobPosition(User userID, String position, Currency salary, Date beginWorkDate, Date endWorkDate) {
		super();
		this.userID = userID;
		this.position = position;
		this.salary = salary;
		this.beginWorkDate = beginWorkDate;
		this.endWorkDate = endWorkDate;
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public User getUserID() {
		return userID;
	}

	public void setUserID(User userID) {
		this.userID = userID;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public Currency getSalary() {
		return salary;
	}

	public void setSalary(Currency salary) {
		this.salary = salary;
	}

	public Date getBeginWorkDate() {
		return beginWorkDate;
	}

	public void setBeginWorkDate(Date beginWorkDate) {
		this.beginWorkDate = beginWorkDate;
	}

	public Date getEndWorkDate() {
		return endWorkDate;
	}

	public void setEndWorkDate(Date endWorkDate) {
		this.endWorkDate = endWorkDate;
	}

	@Override
	public String toString() {
		return "JobPosition [ID=" + ID + ", UserID=" + userID + ", position=" + position + ", salary=" + salary
				+ ", beginWorkDate=" + beginWorkDate + ", endWorkDate=" + endWorkDate + "]";
	}

}
