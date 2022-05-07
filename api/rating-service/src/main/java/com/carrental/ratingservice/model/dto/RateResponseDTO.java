package com.carrental.ratingservice.model.dto;

import lombok.Data;

@Data
public class RateResponseDTO {

    private Long id;

    private Long rate;

    private Long vehicleId;

    private Long userId;

    private String creationDate;
}
