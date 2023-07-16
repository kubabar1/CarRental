package com.carrental.vehicleservice.annotation.validator;

import com.carrental.vehicleservice.annotation.UniqueRegistration;
import com.carrental.vehicleservice.model.entity.VehicleEntity;
import com.carrental.vehicleservice.repository.VehicleRepository;

import javax.validation.ConstraintValidator;
import javax.validation.ConstraintValidatorContext;

public class UniqueRegistrationValidator implements ConstraintValidator<UniqueRegistration, Object> {

    private final VehicleRepository vehicleRepository;

    public UniqueRegistrationValidator(VehicleRepository vehicleRepository) {
        this.vehicleRepository = vehicleRepository;
    }

    @Override
    public void initialize(UniqueRegistration constraintAnnotation) {
    }

    @Override
    public boolean isValid(Object registration, ConstraintValidatorContext context) {
        if (registration == null) {
            return false;
        }
        VehicleEntity vehicleWithGivenRegistration = vehicleRepository.findByRegistration((String) registration).orElse(null);
        return vehicleWithGivenRegistration == null;
    }
}
