package com.carrental.validator;

import com.carrental.model.dto.UserAddDTO;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class PasswordMatchesValidator implements ConstraintValidator<PasswordMatches, Object> {

  @Override
  public void initialize(PasswordMatches constraintAnnotation) {}

  @Override
  public boolean isValid(Object obj, ConstraintValidatorContext context) {
    UserAddDTO user = (UserAddDTO) obj;
    return user.getPassword().equals(user.getPasswordMatches());
  }
}
