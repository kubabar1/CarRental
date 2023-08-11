package com.carrental.userservice.model.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class UserRoleResponseDTO implements Serializable {

    private Long id;

    private String type;

    private String label;
}
