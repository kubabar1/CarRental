package com.carrental.authservice.model.dto;

import lombok.Data;

import java.io.Serializable;
import java.util.Date;

@Data
public class VerificationTokenDTO implements Serializable {

    private String token;

    private Long userId;

    private Date expiryDate;
}
