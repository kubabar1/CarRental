package com.carrental.userservice.model.dto;

import lombok.Data;

import java.util.List;

@Data
public class UserResponseDTO {

    private Long id;

    private String name;

    private String surname;

    private String login;

    private String email;

    private String phone;

    private String birthDate;

    private String pesel;

    private List<UserRoleResponseDTO> userRoles;
}
