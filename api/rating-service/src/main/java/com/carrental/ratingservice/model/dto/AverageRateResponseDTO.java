package com.carrental.ratingservice.model.dto;

import lombok.Data;

import java.io.Serializable;


@Data
public class AverageRateResponseDTO implements Serializable {

    private Long vehicleId;

    private Double averageRate;

    public AverageRateResponseDTO() {
    }

    public AverageRateResponseDTO(Long vehicleId, Double averageRate) {
        this.vehicleId = vehicleId;
        this.averageRate = averageRate;
    }
}
