package com.carrental.vehicleservice.repository;

import com.carrental.vehicleservice.model.entity.FuelTypeEntity;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface FuelTypeRepository extends CrudRepository<FuelTypeEntity, String> {

    Set<FuelTypeEntity> findAll();
}
