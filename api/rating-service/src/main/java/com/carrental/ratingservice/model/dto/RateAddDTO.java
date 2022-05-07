package com.carrental.ratingservice.model.dto;

import lombok.Data;

import javax.validation.constraints.NotNull;

@Data
public class RateAddDTO {

    @NotNull
    private Long rate;

    @NotNull
    private Long vehicleId;

    @NotNull
    private Long userId;
}
