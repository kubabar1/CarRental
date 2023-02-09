package com.carrental.authservice.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserRoleResponseDTO {

    private Long id;

    private String type;

    private String label;
}
