package com.carrental.vehicleservice.model.constants;

public enum VehicleStatCodeEnum {
    AVI("AVI"),
    UAV("UAV");

    private String code;

    public String getCode() {
        return code;
    }

    public void setCode(String code) {
        this.code = code;
    }

    VehicleStatCodeEnum(String code) {
        this.code = code;
    }
}
