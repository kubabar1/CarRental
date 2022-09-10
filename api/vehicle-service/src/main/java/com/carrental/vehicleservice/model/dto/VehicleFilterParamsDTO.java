package com.carrental.vehicleservice.model.dto;

import lombok.Data;

import java.math.BigDecimal;
import java.util.Set;

@Data
public class VehicleFilterParamsDTO {

    private Set<String> bodyTypes;

    private Set<String> brands;

    private Set<String> cities;

    private Set<String> colors;

    private Integer minDoorCount;

    private Integer maxDoorCount;

    private BigDecimal minPrice;

    private BigDecimal maxPrice;

    private Integer minProductionYear;

    private Integer maxProductionYear;

    private Integer minSeatsCount;

    private Integer maxSeatsCount;
}

