package com.carrental.ratingservice.model.dto;

import lombok.Data;

@Data
public class CommentAddDTO {

    private String content;

    private Long vehicleId;

    private Long userId;
}
