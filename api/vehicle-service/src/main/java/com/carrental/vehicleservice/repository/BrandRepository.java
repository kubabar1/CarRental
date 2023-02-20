package com.carrental.vehicleservice.repository;

import com.carrental.vehicleservice.model.entity.BrandEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface BrandRepository extends JpaRepository<BrandEntity, String> {
}
