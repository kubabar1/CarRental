package com.carrental.ratingservice.model.dto;

import lombok.Data;

@Data
public class CommentResponseDTO {

    private Long id;

    private String content;

    private Long vehicleId;

    private Long userId;

    private String creationDate;
}
