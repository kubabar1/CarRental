package com.carrental.vehicleservice.model.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Set;

@Data
public class VehicleOptionsDTO {

    private Set<String> bodyTypes;

    private Set<String> brands;

    private Set<String> colors;

    private Set<String> fuelTypes;

    private Set<LocationResponseDTO> locations;
}

