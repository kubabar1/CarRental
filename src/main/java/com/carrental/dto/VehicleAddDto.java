package com.carrental.dto;

import java.math.BigDecimal;

public class VehicleAddDto {

  private Long id;
  private String brand;
  private String model;
  private BigDecimal dailyFee;
  private String registration;
  private Long location;
  private String vehicleStatus;
  private Integer bestOffer;

  private String bodytype;
  private String fuelType;
  private Integer power;
  private String gearbox;
  private Integer frontWheelDrive;
  private Integer doorsNumber;
  private Integer seatsNumber;
  private String color;
  private Integer metallic;
  private String description;
  private String fileName;
  private Integer productionYear;

  public VehicleAddDto() {
    super();
  }

  public VehicleAddDto(
      Long id,
      String brand,
      String model,
      BigDecimal dailyFee,
      String registration,
      Long location,
      String vehicleStatus,
      Integer bestOffer,
      String bodytype,
      String fuelType,
      Integer power,
      String gearbox,
      Integer frontWheelDrive,
      Integer doorsNumber,
      Integer seatsNumber,
      String color,
      Integer metallic,
      String description,
      Integer productionYear,
      String fileName) {
    super();
    this.id = id;
    this.brand = brand;
    this.model = model;
    this.dailyFee = dailyFee;
    this.registration = registration;
    this.location = location;
    this.vehicleStatus = vehicleStatus;
    this.bestOffer = bestOffer;
    this.bodytype = bodytype;
    this.fuelType = fuelType;
    this.power = power;
    this.gearbox = gearbox;
    this.frontWheelDrive = frontWheelDrive;
    this.doorsNumber = doorsNumber;
    this.seatsNumber = seatsNumber;
    this.color = color;
    this.metallic = metallic;
    this.description = description;
    this.productionYear = productionYear;
    this.fileName = fileName;
  }

  public Long getId() {
    return id;
  }

  public void setId(Long id) {
    this.id = id;
  }

  public String getBrand() {
    return brand;
  }

  public void setBrand(String brand) {
    this.brand = brand;
  }

  public String getModel() {
    return model;
  }

  public void setModel(String model) {
    this.model = model;
  }

  public BigDecimal getDailyFee() {
    return dailyFee;
  }

  public void setDailyFee(BigDecimal dailyFee) {
    this.dailyFee = dailyFee;
  }

  public String getRegistration() {
    return registration;
  }

  public void setRegistration(String registration) {
    this.registration = registration;
  }

  public Long getLocation() {
    return location;
  }

  public void setLocation(Long location) {
    this.location = location;
  }

  public String getVehicleStatus() {
    return vehicleStatus;
  }

  public void setVehicleStatus(String vehicleStatus) {
    this.vehicleStatus = vehicleStatus;
  }

  public Integer getBestOffer() {
    return bestOffer;
  }

  public void setBestOffer(Integer bestOffer) {
    this.bestOffer = bestOffer;
  }

  public String getBodytype() {
    return bodytype;
  }

  public void setBodytype(String bodytype) {
    this.bodytype = bodytype;
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

  public String getDescription() {
    return description;
  }

  public void setDescription(String description) {
    this.description = description;
  }

  public Integer getProductionYear() {
    return productionYear;
  }

  public void setProductionYear(Integer productionYear) {
    this.productionYear = productionYear;
  }

  public String getFileName() {
    return fileName;
  }

  public void setFileName(String fileName) {
    this.fileName = fileName;
  }

  @Override
  public String toString() {
    return "VehicleAddDto [id="
        + id
        + ", brand="
        + brand
        + ", model="
        + model
        + ", dailyFee="
        + dailyFee
        + ", registration="
        + registration
        + ", location="
        + location
        + ", vehicleStatus="
        + vehicleStatus
        + ", bestOffer="
        + bestOffer
        + ", bodytype="
        + bodytype
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
        + ", description="
        + description
        + ", productionYear="
        + productionYear
        + ", fileName="
        + fileName
        + "]";
  }
}
