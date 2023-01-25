package com.carrental.userservice.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class PasswordResetResponseDTO {

    public PasswordResetResponseDTO(String email) {
        this.email = email;
    }

    private String email;
}
