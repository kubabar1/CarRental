package com.carrental.userservice.annotation.validator;


import com.carrental.userservice.annotation.PasswordMatches;
import com.carrental.userservice.model.dto.CreateUserDTO;
import com.carrental.userservice.model.dto.PasswordResetDTO;
import com.carrental.userservice.model.dto.PasswordUpdateDTO;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {

    @Override
    public void initialize(PasswordMatches constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object value, ConstraintValidatorContext context) {
        boolean result = false;
        if (value == null) {
            return false;
        }
        context.disableDefaultConstraintViolation();
        if (value instanceof CreateUserDTO) {
            result = validateUserCreationCase((CreateUserDTO) value);
            context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
                    .addPropertyNode("matchingPassword")
                    .addConstraintViolation();
        } else if (value instanceof PasswordUpdateDTO) {
            result = validatePasswordUpdateCase((PasswordUpdateDTO) value);
            context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
                    .addPropertyNode("confirmPassword")
                    .addConstraintViolation();
        } else if (value instanceof PasswordResetDTO) {
            result = validatePasswordUpdateCase((PasswordResetDTO) value);
            context.buildConstraintViolationWithTemplate(context.getDefaultConstraintMessageTemplate())
                    .addPropertyNode("confirmPassword")
                    .addConstraintViolation();
        }
        return result;
    }

    private boolean validateUserCreationCase(CreateUserDTO createUserDTO) {
        return createUserDTO.getPassword().equals(createUserDTO.getMatchingPassword());
    }

    private boolean validatePasswordUpdateCase(PasswordUpdateDTO passwordUpdateDTO) {
        return passwordUpdateDTO.getNewPassword().equals(passwordUpdateDTO.getConfirmPassword());
    }

    private boolean validatePasswordUpdateCase(PasswordResetDTO passwordResetDTO) {
        return passwordResetDTO.getNewPassword().equals(passwordResetDTO.getConfirmPassword());
    }
}
