package com.carrental.commons.authentication.model;

import lombok.Data;

import java.util.List;

@Data
public class AuthenticatedUserDTO {

    private boolean isAuthenticated;

    private Long id;

    private String name;

    private String surname;

    private String email;

    private String phone;

    private String birthDate;

    private List<String> userRoles;
}
