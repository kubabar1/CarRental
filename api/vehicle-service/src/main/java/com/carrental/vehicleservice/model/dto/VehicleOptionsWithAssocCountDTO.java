package com.carrental.vehicleservice.model.dto;

import lombok.Data;

import java.util.Set;

@Data
public class VehicleOptionsWithAssocCountDTO {

    private Set<AssocDetailsDTO> bodyTypes;

    private Set<AssocDetailsDTO> brands;

    private Set<ModelAssocDetailsDTO> models;

    private Set<AssocDetailsDTO> colors;

    private Set<AssocDetailsDTO> fuelTypes;
}
