package com.carrental.vehicleservice.annotation;

import com.carrental.vehicleservice.annotation.validator.UniqueRegistrationValidator;

import javax.validation.Constraint;
import javax.validation.Payload;
import java.lang.annotation.Documented;
import java.lang.annotation.Retention;
import java.lang.annotation.Target;

import static java.lang.annotation.ElementType.*;
import static java.lang.annotation.RetentionPolicy.RUNTIME;

@Target({TYPE, FIELD, ANNOTATION_TYPE})
@Retention(RUNTIME)
@Constraint(validatedBy = UniqueRegistrationValidator.class)
@Documented
public @interface UniqueRegistration {

    String message() default "Vehicle with given registration already exists";

    Class<?>[] groups() default {};

    Class<? extends Payload>[] payload() default {};
}
