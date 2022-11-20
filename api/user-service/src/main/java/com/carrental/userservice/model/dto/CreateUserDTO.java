package com.carrental.userservice.model.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class CreateUserDTO implements Serializable {

    private String firstName;

    private String lastName;

    private String email;

    private String phone;

    private String birthDate;

    private String password;

    private String matchingPassword;
}
