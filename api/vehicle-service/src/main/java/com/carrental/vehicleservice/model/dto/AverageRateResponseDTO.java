package com.carrental.vehicleservice.model.dto;

import lombok.Data;

import java.io.Serializable;


@Data
public class AverageRateResponseDTO implements Serializable {

    private Long vehicleId;

    private Double averageRate;
}
