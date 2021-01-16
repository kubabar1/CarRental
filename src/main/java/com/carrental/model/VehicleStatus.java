package com.carrental.model;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "VehicleStatus")
public class VehicleStatus implements Serializable {

  @Id
  @JoinColumn(name = "vehicleStatusCode")
  private String vehicleStatCode;

  @Column(name = "description")
  private String description;

  public VehicleStatus() {
    super();
  }

  public VehicleStatus(String vehicleStatCode, String description) {
    super();
    this.vehicleStatCode = vehicleStatCode;
    this.description = description;
  }

  public String getVehicleStatCode() {
    return vehicleStatCode;
  }

  public void setVehicleStatCode(String vehicleStatCode) {
    this.vehicleStatCode = vehicleStatCode;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  @Override
  public String toString() {
    return "VehicleStatus [vehicleStatusCode="
        + vehicleStatCode
        + ", description="
        + description
        + "]";
  }
}
