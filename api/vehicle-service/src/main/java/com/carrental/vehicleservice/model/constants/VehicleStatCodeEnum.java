package com.carrental.vehicleservice.model.constants;

import javax.validation.constraints.NotEmpty;

public enum VehicleStatCodeEnum {
    AVI("AVI"),
    UAV("UAV");

    @NotEmpty
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
