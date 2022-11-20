package com.carrental.authservice.model.dto;

import lombok.Getter;
import lombok.Setter;

import java.io.Serializable;

@Getter
@Setter
public class UserActivationDTO implements Serializable {

    private Long userId;

    private boolean enable;
}
