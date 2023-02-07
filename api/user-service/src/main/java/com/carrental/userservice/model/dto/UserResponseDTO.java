package com.carrental.userservice.model.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.List;

@Data
public class UserResponseDTO implements Serializable {

    private Long id;

    private String name;

    private String surname;

    private String email;

    private String phone;

    private String birthDate;

    private List<UserRoleResponseDTO> userRoles;
}
