package com.carrental.vehicleservice.repository;

import com.carrental.vehicleservice.model.entity.ModelEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface ModelRepository extends JpaRepository<ModelEntity, String> {

    @Query("SELECT m.model FROM models m JOIN brands b on (m.brand = b.brand) WHERE b.brand = :brand")
    Set<String> findByBrand(@Param("brand") String brand);
}
