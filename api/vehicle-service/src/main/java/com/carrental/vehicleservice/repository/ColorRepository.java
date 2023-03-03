package com.carrental.vehicleservice.repository;

import com.carrental.vehicleservice.model.dto.AssocDetailsDTO;
import com.carrental.vehicleservice.model.entity.ColorEntity;
import com.carrental.vehicleservice.model.entity.VehicleDetailsEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import javax.persistence.OneToMany;
import java.util.Set;

public interface ColorRepository extends JpaRepository<ColorEntity, String> {

    @Query(value = "SELECT new com.carrental.vehicleservice.model.dto.AssocDetailsDTO(c.color, c.vehicleDetails.size) FROM colors c")
    Set<AssocDetailsDTO> getColorsWithAssociatedVehiclesCount();
}
