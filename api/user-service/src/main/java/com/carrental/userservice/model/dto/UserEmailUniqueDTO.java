package com.carrental.userservice.model.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class UserEmailUniqueDTO {

    public UserEmailUniqueDTO(boolean isUserEmailUnique) {
        this.isUserEmailUnique = isUserEmailUnique;
    }

    boolean isUserEmailUnique;
}
