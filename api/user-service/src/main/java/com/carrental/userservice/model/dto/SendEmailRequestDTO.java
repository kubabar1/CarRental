package com.carrental.userservice.model.dto;

import lombok.Data;

import java.util.Set;

@Data
public class SendEmailRequestDTO {

    private Set<String> receivers;

    private String subject;

    private String content;
}
