package com.carrental.vehicleservice.repository;

import com.carrental.vehicleservice.model.dto.AssocDetailsDTO;
import com.carrental.vehicleservice.model.entity.BodyTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Set;

public interface BodyTypeRepository extends JpaRepository<BodyTypeEntity, String> {

    @Query(value = "SELECT new com.carrental.vehicleservice.model.dto.AssocDetailsDTO(bt.bodyType, bt.vehicleDetails.size) FROM body_types bt")
    Set<AssocDetailsDTO> getBodyTypesWithAssociatedVehiclesCount();
}
