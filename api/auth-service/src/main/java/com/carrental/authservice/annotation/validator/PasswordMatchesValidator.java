package com.carrental.authservice.annotation.validator;


import com.carrental.authservice.annotation.PasswordMatches;
import com.carrental.authservice.model.dto.CreateUserDTO;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {

    @Override
    public void initialize(PasswordMatches constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        CreateUserDTO createUserDTO = (CreateUserDTO) value;
        return createUserDTO.getPassword().equals(createUserDTO.getMatchingPassword());
    }
}
