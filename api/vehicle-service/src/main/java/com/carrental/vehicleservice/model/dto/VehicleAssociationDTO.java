package com.carrental.vehicleservice.model.dto;

import lombok.Data;

@Data
public class VehicleAssociationDTO {

    private String name;

    private String count;

    public VehicleAssociationDTO() {
    }

    public VehicleAssociationDTO(String name, String count) {
        this.name = name;
        this.count = count;
    }
}
