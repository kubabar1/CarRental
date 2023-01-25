package com.carrental.userservice.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserEmailExistsDTO {

    public UserEmailExistsDTO(boolean isUserEmailExists) {
        this.isUserEmailExists = isUserEmailExists;
    }

    private boolean isUserEmailExists;
}
