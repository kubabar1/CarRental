package com.carrental.vehicleservice.model.dto;

import lombok.Data;

@Data
public class AssocDetailsDTO {

    private String name;

    private int count;

    public AssocDetailsDTO() {
    }

    public AssocDetailsDTO(String name, int count) {
        this.name = name;
        this.count = count;
    }
}
