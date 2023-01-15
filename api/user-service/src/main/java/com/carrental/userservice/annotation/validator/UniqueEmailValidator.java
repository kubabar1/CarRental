package com.carrental.userservice.annotation.validator;

import com.carrental.userservice.annotation.UniqueEmail;
import com.carrental.userservice.model.entity.UserEntity;
import com.carrental.userservice.repository.UserRepository;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueEmailValidator implements ConstraintValidator<UniqueEmail, Object> {

    private final UserRepository userRepository;

    public UniqueEmailValidator(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Override
    public void initialize(UniqueEmail constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object email, ConstraintValidatorContext context) {
        if (email == null) {
            return false;
        }
        UserEntity userWithGivenEmail = userRepository.findByEmail((String) email).orElse(null);
        if (userWithGivenEmail != null) {
            return false;
        }
        return true;
    }
}
