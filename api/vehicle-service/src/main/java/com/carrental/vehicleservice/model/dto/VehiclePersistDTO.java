package com.carrental.vehicleservice.model.dto;

import com.carrental.vehicleservice.model.constants.VehicleStatCodeEnum;
import lombok.Data;

import javax.validation.Valid;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.Size;
import java.math.BigDecimal;

@Data
public class VehiclePersistDTO {

    @NotEmpty
    @Size(max = 20)
    private String registration;

    @NotEmpty
    @Size(max = 50)
    private String brand;

    @NotEmpty
    @Size(max = 50)
    private String model;

    @NotNull
    private BigDecimal dailyFee;

    @NotNull
    private Long locationId;

    @NotNull
    private boolean bestOffer;

    @NotEmpty
    private VehicleStatCodeEnum vehicleStatus;

    @Valid
    private VehicleDetailsDTO vehicleDetailsDTO;
}
