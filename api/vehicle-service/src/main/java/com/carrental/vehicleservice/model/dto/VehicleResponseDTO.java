package com.carrental.vehicleservice.model.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Set;

@Data
public class VehicleResponseDTO {

    private Long id;

    private String registration;

    private String brand;

    private String model;

    private BigDecimal dailyFee;

    private LocationResponseDTO location;

    private boolean bestOffer;

    private VehicleStatusResponseDTO vehicleStatus;

    private VehicleDetailsDTO vehicleDetails;

    private Set<EquipmentResponseDTO> equipments;

    private Double averageRate;
}
