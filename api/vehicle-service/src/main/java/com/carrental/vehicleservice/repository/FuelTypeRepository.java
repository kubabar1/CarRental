package com.carrental.vehicleservice.repository;

import com.carrental.vehicleservice.model.dto.AssocDetailsDTO;
import com.carrental.vehicleservice.model.entity.FuelTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface FuelTypeRepository extends JpaRepository<FuelTypeEntity, String> {

    @Query(value = "SELECT new com.carrental.vehicleservice.model.dto.AssocDetailsDTO(ft.fuelType, ft.vehicleDetails.size) FROM fuel_types ft")
    Set<AssocDetailsDTO> getFuelTypesWithAssociatedVehiclesCount();
}
