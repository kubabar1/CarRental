package com.carrental.vehicleservice.model.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class VehicleModelDTO {

    @NotEmpty
    @Size(max = 50)
    private String brand;

    @NotEmpty
    @Size(max = 50)
    private String model;
}
