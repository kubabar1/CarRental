package com.carrental.model;

import java.io.Serializable;
import java.sql.Date;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.ManyToMany;
import javax.persistence.OneToMany;
import javax.persistence.Table;

@Entity
@Table(name = "Users")
public class User implements Serializable {

	@Id
	@Column(name = "ID")
	private Long ID;

	@Column(name = "name")
	private String name;

	@Column(name = "surname")
	private String surname;

	@Column(name = "login")
	private String login;

	@Column(name = "password")
	private String password;

	@Column(name = "email")
	private String email;

	@Column(name = "phone")
	private String phone;

	@Column(name = "birthDate")
	private Date birthDate;

	@Column(name = "pesel")
	private String pesel;

	@OneToMany(mappedBy = "userID")
	private List<JobPosition> jobPositionList = new ArrayList<JobPosition>();

	@OneToMany(mappedBy = "authorID")
	private List<Stars> starsList = new ArrayList<Stars>();

	@OneToMany(mappedBy = "authorID")
	private List<Comments> commentList = new ArrayList<Comments>();

	@OneToMany(mappedBy = "userID")
	private List<Booking> bookingList = new ArrayList<Booking>();

	@ManyToMany(mappedBy = "userList")
	private List<UserRole> userRolesList = new ArrayList<UserRole>();

	public User() {
		super();
	}

	public User(String name, String surname, String login, String password, String email, String phone, Date birthDate,
			String pesel) {
		super();
		this.name = name;
		this.surname = surname;
		this.login = login;
		this.password = password;
		this.email = email;
		this.phone = phone;
		this.birthDate = birthDate;
		this.pesel = pesel;
	}

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getSurname() {
		return surname;
	}

	public void setSurname(String surname) {
		this.surname = surname;
	}

	public String getLogin() {
		return login;
	}

	public void setLogin(String login) {
		this.login = login;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
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

	public Date getBirthDate() {
		return birthDate;
	}

	public void setBirthDate(Date birthDate) {
		this.birthDate = birthDate;
	}

	public String getPesel() {
		return pesel;
	}

	public void setPesel(String pesel) {
		this.pesel = pesel;
	}

	public List<JobPosition> getItems() {
		return jobPositionList;
	}

	public void setItems(List<JobPosition> jobPositionList) {
		this.jobPositionList = jobPositionList;
	}

	public List<UserRole> getUserRolesList() {
		return userRolesList;
	}

	public void setUserRolesList(List<UserRole> userRolesList) {
		this.userRolesList = userRolesList;
	}

	public List<JobPosition> getJobPositionList() {
		return jobPositionList;
	}

	public void setJobPositionList(List<JobPosition> jobPositionList) {
		this.jobPositionList = jobPositionList;
	}

	public List<Stars> getStarsList() {
		return starsList;
	}

	public void setStarsList(List<Stars> starsList) {
		this.starsList = starsList;
	}

	public List<Comments> getCommentList() {
		return commentList;
	}

	public void setCommentList(List<Comments> commentList) {
		this.commentList = commentList;
	}

	@Override
	public String toString() {
		return "User [ID=" + ID + ", name=" + name + ", surname=" + surname + ", login=" + login + ", password="
				+ password + ", email=" + email + ", phone=" + phone + ", birthDate=" + birthDate + ", pesel=" + pesel
				+ "]";
	}

}
