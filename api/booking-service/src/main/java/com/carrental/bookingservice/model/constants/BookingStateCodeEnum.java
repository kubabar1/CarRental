package com.carrental.bookingservice.model.constants;

public enum BookingStateCodeEnum {
  CAN("CAN"),
  REN("REN"),
  RES("RES"),
  RET("RET");

  private String code;

  public String getCode() {
    return code;
  }

  public void setCode(String code) {
    this.code = code;
  }

  BookingStateCodeEnum(String code) {
    this.code = code;
  }
}
