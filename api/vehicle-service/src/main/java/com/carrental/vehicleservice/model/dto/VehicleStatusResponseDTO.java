package com.carrental.vehicleservice.model.dto;

import com.carrental.vehicleservice.model.constants.VehicleStatCodeEnum;
import lombok.Data;

@Data
public class VehicleStatusResponseDTO {

    private VehicleStatCodeEnum vehicleStatCode;

    private String description;
}
