package com.carrental.userservice.model.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class TokenRequestDTO implements Serializable {

    private Long userId;

    public TokenRequestDTO() {
    }

    public TokenRequestDTO(Long userId) {
        this.userId = userId;
    }
}
