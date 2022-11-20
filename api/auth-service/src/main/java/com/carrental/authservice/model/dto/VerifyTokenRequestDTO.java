package com.carrental.authservice.model.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class VerifyTokenRequestDTO implements Serializable {

    private Long userId;

    private String token;
}
