package com.carrental.ratingservice.model.dto;

import lombok.Data;

import javax.validation.constraints.Max;
import javax.validation.constraints.Min;
import javax.validation.constraints.NotNull;

@Data
public class CommentWithRateAddDTO {

    @NotNull
    private String content;

    @NotNull
    private Long vehicleId;

    @NotNull
    private Long userId;

    @NotNull
    @Min(value = 1)
    @Max(value = 5)
    private int rate;
}
