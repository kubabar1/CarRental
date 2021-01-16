package com.carrental.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "Stars")
public class Stars implements Serializable {

  @Id
  @GeneratedValue(strategy = GenerationType.IDENTITY)
  @Column(name = "ID")
  private Long id;

  @Column(name = "vehicleID")
  private Long vehicleId;

  @Column(name = "stars")
  private Integer stars;

  public Stars() {
    super();
  }

  public Stars(Long vehicleId, Integer stars) {
    super();
    this.vehicleId = vehicleId;
    this.stars = stars;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public Long getVehicleId() {
    return vehicleId;
  }

  public void setVehicleId(Long vehicleId) {
    this.vehicleId = vehicleId;
  }

  public Integer getStars() {
    return stars;
  }

  public void setStars(Integer stars) {
    this.stars = stars;
  }

  @Override
  public String toString() {
    return "Stars [id=" + id + ", vehicleId=" + vehicleId + ", stars=" + stars + "]";
  }
}
