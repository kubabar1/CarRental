package com.carrental.userservice.model.dto;

import com.carrental.userservice.annotation.PasswordMatches;
import com.carrental.userservice.annotation.ValidPassword;
import lombok.Data;
import org.hibernate.validator.constraints.Length;

import javax.validation.constraints.NotEmpty;

@Data
@PasswordMatches
public class PasswordResetDTO {

    @NotEmpty
    @ValidPassword
    @Length(max = 16)
    private String newPassword;

    @NotEmpty
    @Length(max = 16)
    private String confirmPassword;

    @NotEmpty
    private String token;
}
