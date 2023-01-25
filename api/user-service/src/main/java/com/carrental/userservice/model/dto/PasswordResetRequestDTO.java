package com.carrental.userservice.model.dto;

import com.carrental.userservice.annotation.ValidEmail;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotEmpty;

@Getter
@Setter
public class PasswordResetRequestDTO {

    @NotEmpty
    @ValidEmail
    private String email;
}
