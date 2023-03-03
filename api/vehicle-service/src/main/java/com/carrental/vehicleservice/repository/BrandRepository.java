package com.carrental.vehicleservice.repository;

import com.carrental.vehicleservice.model.dto.AssocDetailsDTO;
import com.carrental.vehicleservice.model.entity.BrandEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface BrandRepository extends JpaRepository<BrandEntity, String> {

    @Query(value = "SELECT new com.carrental.vehicleservice.model.dto.AssocDetailsDTO(b.brand, b.vehicles.size) FROM brands b")
    Set<AssocDetailsDTO> getBrandsWithAssociatedVehiclesCount();
}
