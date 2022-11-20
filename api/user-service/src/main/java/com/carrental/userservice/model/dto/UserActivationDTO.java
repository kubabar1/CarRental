package com.carrental.userservice.model.dto;

import lombok.Data;

@Data
public class UserActivationDTO {

    private Long userId;

    private boolean enable;
}
