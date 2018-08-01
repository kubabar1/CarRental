package com.carrental.model;

import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

import javax.persistence.CascadeType;
import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.JoinTable;
import javax.persistence.ManyToMany;
import javax.persistence.Table;
import javax.persistence.JoinColumn;

@Entity
@Table(name = "UserRoles")
public class UserRole implements Serializable {

	@Id
	@Column(name = "ID")
	private Long ID;

	@Column(name = "type")
	private String type;

	@ManyToMany(cascade = CascadeType.ALL)
	@JoinTable(name = "AppUsersRoles", joinColumns = @JoinColumn(name = "userRoleID"), inverseJoinColumns = @JoinColumn(name = "userID"))
	private List<User> userList = new ArrayList<User>();

	public Long getID() {
		return ID;
	}

	public void setID(Long iD) {
		ID = iD;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public List<User> getUserList() {
		return userList;
	}

	public void setUserList(List<User> userList) {
		this.userList = userList;
	}

	@Override
	public String toString() {
		return "UserRole [ID=" + ID + ", type=" + type + ", userList=" + userList + "]";
	}

}
