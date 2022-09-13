package com.carrental.ratingservice.model.dto;

import lombok.Data;

@Data
public class CommentWithRateResponseDTO {

    private Long id;

    private String content;

    private Long vehicleId;

    private Long userId;

    private int rate;

    private String creationDate;
}
