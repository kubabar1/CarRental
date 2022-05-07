package com.carrental.userservice.model.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;

@Data
public class RoleAddDTO {

    @NotEmpty
    private Long roleId;
}
