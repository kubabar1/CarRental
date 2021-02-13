package com.carrental.model.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;

import javax.persistence.*;
import java.io.Serializable;

@Entity
@Table(name = "VehicleParameters")
public class VehicleParameters implements Serializable {

  @Id
  @JsonIgnore
  @Column(name = "vehicleID")
  private Long vehicleID;

  @Column(name = "bodyType")
  private String bodyType;

  @Column(name = "productionYear")
  private Integer productionYear;

  @Column(name = "fuelType")
  private String fuelType;

  @Column(name = "power")
  private Integer power;

  @Column(name = "gearbox")
  private String gearbox;

  @Column(name = "frontWheelDrive")
  private Integer frontWheelDrive;

  @Column(name = "doorsNumber")
  private Integer doorsNumber;

  @Column(name = "seatsNumber")
  private Integer seatsNumber;

  @Column(name = "color")
  private String color;

  @Column(name = "metallic")
  private Integer metallic;

  @Column(name = "photoName")
  private String photoName;

  @Column(name = "description")
  private String description;

  @JsonIgnore
  @OneToOne(fetch = FetchType.LAZY)
  @JoinColumn(name = "vehicleID")
  private Vehicle vehicle;

  public VehicleParameters() {
    super();
  }

  public VehicleParameters(
      Long vehicleID,
      String bodyType,
      Integer productionYear,
      String fuelType,
      Integer power,
      String gearbox,
      Integer frontWheelDrive,
      Integer doorsNumber,
      Integer seatsNumber,
      String color,
      Integer metallic,
      String photoName,
      String description) {
    super();
    this.vehicleID = vehicleID;
    this.bodyType = bodyType;
    this.productionYear = productionYear;
    this.fuelType = fuelType;
    this.power = power;
    this.gearbox = gearbox;
    this.frontWheelDrive = frontWheelDrive;
    this.doorsNumber = doorsNumber;
    this.seatsNumber = seatsNumber;
    this.color = color;
    this.metallic = metallic;
    this.photoName = photoName;
    this.description = description;
  }

  public Long getVehicleID() {
    return vehicleID;
  }

  public void setVehicleID(Long vehicleID) {
    this.vehicleID = vehicleID;
  }

  public String getBodytype() {
    return bodyType;
  }

  public void setBodyType(String bodyType) {
    this.bodyType = bodyType;
  }

  public Integer getProductionYear() {
    return productionYear;
  }

  public void setProductionYear(Integer productionYear) {
    this.productionYear = productionYear;
  }

  public String getFuelType() {
    return fuelType;
  }

  public void setFuelType(String fuelType) {
    this.fuelType = fuelType;
  }

  public Integer getPower() {
    return power;
  }

  public void setPower(Integer power) {
    this.power = power;
  }

  public String getGearbox() {
    return gearbox;
  }

  public void setGearbox(String gearbox) {
    this.gearbox = gearbox;
  }

  public Integer getFrontWheelDrive() {
    return frontWheelDrive;
  }

  public void setFrontWheelDrive(Integer frontWheelDrive) {
    this.frontWheelDrive = frontWheelDrive;
  }

  public Integer getDoorsNumber() {
    return doorsNumber;
  }

  public void setDoorsNumber(Integer doorsNumber) {
    this.doorsNumber = doorsNumber;
  }

  public Integer getSeatsNumber() {
    return seatsNumber;
  }

  public void setSeatsNumber(Integer seatsNumber) {
    this.seatsNumber = seatsNumber;
  }

  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  public Integer getMetallic() {
    return metallic;
  }

  public void setMetallic(Integer metallic) {
    this.metallic = metallic;
  }

  public String getPhotoName() {
    return photoName;
  }

  public void setPhotoName(String photoName) {
    this.photoName = photoName;
  }

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Vehicle getVehicle() {
    return vehicle;
  }

  public void setVehicle(Vehicle vehicle) {
    this.vehicle = vehicle;
  }

  @Override
  public String toString() {
    return "VehicleParameters [vehicleID="
        + vehicleID
        + ", bodyType="
        + bodyType
        + ", productionYear="
        + productionYear
        + ", fuelType="
        + fuelType
        + ", power="
        + power
        + ", gearbox="
        + gearbox
        + ", frontWheelDrive="
        + frontWheelDrive
        + ", doorsNumber="
        + doorsNumber
        + ", seatsNumber="
        + seatsNumber
        + ", color="
        + color
        + ", metallic="
        + metallic
        + ", photoName="
        + photoName
        + "]";
  }
}
