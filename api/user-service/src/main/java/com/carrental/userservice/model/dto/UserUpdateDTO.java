package com.carrental.userservice.model.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class UserUpdateDTO {

    @NotEmpty
    private String name;

    @NotEmpty
    private String surname;

    @NotEmpty
    private String phone;

    @NotEmpty
    private String birthDate;
}
