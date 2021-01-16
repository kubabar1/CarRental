package com.carrental.model.dto;

import java.io.Serializable;
import java.math.BigDecimal;

public class VehicleFilterDTO implements Serializable {

  private String brand;
  private String model;
  private String city;
  private String bodytype;
  private BigDecimal priceFrom;
  private BigDecimal priceTo;
  private Integer placesNumberFrom;
  private Integer placesNumberTo;
  private Integer doorsNumberFrom;
  private Integer doorsNumberTo;
  private Integer productionYearFrom;
  private Integer productionYearTo;
  private String color;

  public VehicleFilterDTO() {
    super();
  }

  public VehicleFilterDTO(
      String brand,
      String model,
      String city,
      String bodytype,
      BigDecimal priceFrom,
      BigDecimal priceTo,
      Integer placesNumberFrom,
      Integer placesNumberTo,
      Integer doorsNumberFrom,
      Integer doorsNumberTo,
      Integer productionYearFrom,
      Integer productionYearTo,
      String color) {
    super();
    this.brand = brand;
    this.model = model;
    this.city = city;
    this.bodytype = bodytype;
    this.priceFrom = priceFrom;
    this.priceTo = priceTo;
    this.placesNumberFrom = placesNumberFrom;
    this.placesNumberTo = placesNumberTo;
    this.doorsNumberFrom = doorsNumberFrom;
    this.doorsNumberTo = doorsNumberTo;
    this.productionYearFrom = productionYearFrom;
    this.productionYearTo = productionYearTo;
    this.color = color;
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

  public String getCity() {
    return city;
  }

  public void setCity(String city) {
    this.city = city;
  }

  public String getBodytype() {
    return bodytype;
  }

  public void setBodytype(String bodytype) {
    this.bodytype = bodytype;
  }

  public BigDecimal getPriceFrom() {
    return priceFrom;
  }

  public void setPriceFrom(BigDecimal priceFrom) {
    this.priceFrom = priceFrom;
  }

  public BigDecimal getPriceTo() {
    return priceTo;
  }

  public void setPriceTo(BigDecimal priceTo) {
    this.priceTo = priceTo;
  }

  public Integer getPlacesNumberFrom() {
    return placesNumberFrom;
  }

  public void setPlacesNumberFrom(Integer placesNumberFrom) {
    this.placesNumberFrom = placesNumberFrom;
  }

  public Integer getPlacesNumberTo() {
    return placesNumberTo;
  }

  public void setPlacesNumberTo(Integer placesNumberTo) {
    this.placesNumberTo = placesNumberTo;
  }

  public Integer getDoorsNumberFrom() {
    return doorsNumberFrom;
  }

  public void setDoorsNumberFrom(Integer doorsNumberFrom) {
    this.doorsNumberFrom = doorsNumberFrom;
  }

  public Integer getDoorsNumberTo() {
    return doorsNumberTo;
  }

  public void setDoorsNumberTo(Integer doorsNumberTo) {
    this.doorsNumberTo = doorsNumberTo;
  }

  public Integer getProductionYearFrom() {
    return productionYearFrom;
  }

  public void setProductionYearFrom(Integer productionYearFrom) {
    this.productionYearFrom = productionYearFrom;
  }

  public Integer getProductionYearTo() {
    return productionYearTo;
  }

  public void setProductionYearTo(Integer productionYearTo) {
    this.productionYearTo = productionYearTo;
  }

  public String getColor() {
    return color;
  }

  public void setColor(String color) {
    this.color = color;
  }

  @Override
  public String toString() {
    return "CarFilterWrapper [brand="
        + brand
        + ", model="
        + model
        + ", city="
        + city
        + ", bodytype="
        + bodytype
        + ", priceFrom="
        + priceFrom
        + ", priceTo="
        + priceTo
        + ", placesNumberFrom="
        + placesNumberFrom
        + ", placesNumberTo="
        + placesNumberTo
        + ", doorsNumberFrom="
        + doorsNumberFrom
        + ", doorsNumberTo="
        + doorsNumberTo
        + ", productionYearFrom="
        + productionYearFrom
        + ", productionYearTo="
        + productionYearTo
        + ", color="
        + color
        + "]";
  }
}
