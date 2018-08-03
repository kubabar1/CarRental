package com.carrental.model;

import java.io.Serializable;
import java.math.BigDecimal;
import java.sql.Date;
import java.util.Currency;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.FetchType;
import javax.persistence.Id;
import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import javax.persistence.Table;

import com.fasterxml.jackson.annotation.JsonFormat;

@Entity
@Table(name = "JobPosition")
public class JobPosition implements Serializable {

	@Id
	@Column(name = "ID")
	private Long id;

	@Column(name = "UserID")
	private Long userId;

	@Column(name = "position")
	private String position;

	@Column(name = "salary")
	private BigDecimal salary;

	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name = "beginWorkDate")
	private Date beginWorkDate;

	@JsonFormat(pattern = "yyyy-MM-dd")
	@Column(name = "endWorkDate")
	private Date endWorkDate;

	public JobPosition() {
		super();
	}

	public JobPosition(Long userId, String position, BigDecimal salary, Date beginWorkDate, Date endWorkDate) {
		super();
		this.userId = userId;
		this.position = position;
		this.salary = salary;
		this.beginWorkDate = beginWorkDate;
		this.endWorkDate = endWorkDate;
	}

	public Long getId() {
		return id;
	}

	public void setId(Long id) {
		this.id = id;
	}

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getPosition() {
		return position;
	}

	public void setPosition(String position) {
		this.position = position;
	}

	public BigDecimal getSalary() {
		return salary;
	}

	public void setSalary(BigDecimal salary) {
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
		return "JobPosition [id=" + id + ", UserID=" + userId + ", position=" + position + ", salary="
				+ salary.doubleValue() + ", beginWorkDate=" + beginWorkDate + ", endWorkDate=" + endWorkDate + "]";
	}

}
