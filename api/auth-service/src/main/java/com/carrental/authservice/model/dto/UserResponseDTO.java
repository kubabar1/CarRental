package com.carrental.authservice.model.dto;

import lombok.Data;


@Data
public class UserResponseDTO {

    private Long userId;

    private String firstName;

    private String lastName;

    private String userName;

    private String email;

    private boolean enabled;
}
