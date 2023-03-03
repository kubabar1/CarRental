package com.carrental.vehicleservice.model.dto;

import lombok.Data;

@Data
public class ModelAssocDetailsDTO {

    private String name;

    private String brand;

    private Integer count;

    public ModelAssocDetailsDTO(String name, String brand, Integer count) {
        this.name = name;
        this.brand = brand;
        this.count = count;
    }
}
