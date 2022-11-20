package com.carrental.authservice.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class UserDetailsDTO implements Serializable {

    private Long id;

    private String name;

    private String surname;

    private String email;

    private String phone;

    private String birthDate;

    private String password;

    private boolean enabled;
}
