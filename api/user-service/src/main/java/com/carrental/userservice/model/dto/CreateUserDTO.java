package com.carrental.userservice.model.dto;

import com.carrental.userservice.annotation.PasswordMatches;
import com.carrental.userservice.annotation.UniqueEmail;
import com.carrental.userservice.annotation.ValidEmail;
import com.carrental.userservice.annotation.ValidPassword;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Data;
import org.hibernate.validator.constraints.Length;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;
import javax.validation.constraints.PastOrPresent;
import java.io.Serializable;
import java.time.LocalDate;

@Data
@PasswordMatches
public class CreateUserDTO implements Serializable {

    @NotEmpty
    @Length(max = 40)
    private String firstName;

    @NotEmpty
    @Length(max = 40)
    private String lastName;

    @NotEmpty
    @ValidEmail
    @UniqueEmail
    private String email;

    @NotEmpty
    @Length(max = 20)
    private String phone;

    @NotNull
    @PastOrPresent
    @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd")
    private LocalDate birthDate;

    @NotEmpty
    @ValidPassword
    @Length(max = 100)
    private String password;

    @NotEmpty
    @Length(max = 100)
    private String matchingPassword;
}
