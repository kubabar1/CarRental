package com.carrental.vehicleservice.repository;

import com.carrental.vehicleservice.model.entity.BodyTypeEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface BodyTypeRepository extends JpaRepository<BodyTypeEntity, String> {
}
