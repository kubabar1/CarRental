package com.carrental.authservice.model.dto;

import lombok.Data;

import java.io.Serializable;

@Data
public class GenerateTokenRequestDTO implements Serializable {

    private Long userId;
}
