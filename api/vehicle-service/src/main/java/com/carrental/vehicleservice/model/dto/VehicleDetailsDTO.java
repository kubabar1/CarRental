package com.carrental.vehicleservice.model.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class VehicleDetailsDTO {

    @NotEmpty
    @Size(max = 30)
    private String bodyType;

    @NotNull
    private Integer productionYear;

    @NotEmpty
    @Size(max = 30)
    private String fuelType;

    @NotNull
    private Integer power;

    @NotEmpty
    @Size(max = 30)
    private String gearbox;

    @NotNull
    private boolean frontWheelDrive;

    @NotNull
    private Integer doorsNumber;

    @NotNull
    private Integer seatsNumber;

    @NotEmpty
    @Size(max = 30)
    private String color;

    @NotNull
    private boolean metallic;

    @NotEmpty
    @Size(max = 70)
    private String photoName;

    @NotEmpty
    @Size(max = 100)
    private String description;
}