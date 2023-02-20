package com.carrental.vehicleservice.repository;

import com.carrental.vehicleservice.model.entity.ColorEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;

import java.util.Set;

public interface ColorRepository extends JpaRepository<ColorEntity, String> {
}
