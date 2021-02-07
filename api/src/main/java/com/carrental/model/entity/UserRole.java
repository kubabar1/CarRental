package com.carrental.model.entity;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Entity
@Table(name = "UserRoles")
public class UserRole implements Serializable {

  @Id
  @Column(name = "ID")
  private Long id;

  @Column(name = "type")
  private String type;

  public UserRole() {
    super();
  }

  public UserRole(Long id, String type) {
    super();
    this.id = id;
    this.type = type;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getType() {
    return type;
  }

  public void setType(String type) {
    this.type = type;
  }

  @Override
  public String toString() {
    return "UserRole [id=" + id + ", type=" + type + "]";
  }
}
