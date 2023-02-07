package com.carrental.userservice.model.dto;

import lombok.Data;

import java.util.Set;

@Data
public class UsersEmailsResponseDTO {

    Set<String> emails;
}
