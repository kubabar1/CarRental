package com.carrental.bookingservice.model.dto;

import com.carrental.bookingservice.model.constants.VehicleStatCodeEnum;
import lombok.Data;

@Data
public class VehicleStatusResponseDTO {

    private VehicleStatCodeEnum vehicleStatCode;

    private String description;
}
