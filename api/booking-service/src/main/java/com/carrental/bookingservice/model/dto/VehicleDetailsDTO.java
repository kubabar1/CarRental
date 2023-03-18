package com.carrental.bookingservice.model.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;

@Data
public class VehicleDetailsDTO {

    @NotEmpty
    @Size(max = 50)
    private String bodyType;

    @NotNull
    private Integer productionYear;

    @NotEmpty
    @Size(max = 50)
    private String fuelType;

    @NotNull
    private Integer power;

    @NotEmpty
    @Size(max = 50)
    private String gearbox;

    @NotNull
    private boolean frontWheelDrive;

    @NotNull
    private Integer doorsNumber;

    @NotNull
    private Integer seatsNumber;

    @NotEmpty
    @Size(max = 50)
    private String color;

    @NotNull
    private boolean metallic;

    @NotEmpty
    @Size(max = 70)
    private String imageName;

    @NotEmpty
    @Size(max = 255)
    private String description;
}
