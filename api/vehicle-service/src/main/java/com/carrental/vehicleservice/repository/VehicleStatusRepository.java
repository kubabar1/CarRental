package com.carrental.vehicleservice.repository;

import com.carrental.vehicleservice.model.constants.VehicleStatCodeEnum;
import com.carrental.vehicleservice.model.entity.VehicleStatusEntity;
import org.springframework.data.jpa.repository.JpaRepository;

public interface VehicleStatusRepository extends JpaRepository<VehicleStatusEntity, VehicleStatCodeEnum> {
}
