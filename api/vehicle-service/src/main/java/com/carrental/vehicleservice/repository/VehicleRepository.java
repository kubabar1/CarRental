package com.carrental.vehicleservice.repository;

import com.carrental.vehicleservice.model.entity.VehicleEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Set;

public interface VehicleRepository extends PagingAndSortingRepository<VehicleEntity, Long> {

    Set<VehicleEntity> findAll();

    @Query("select v from vehicles v where v.vehicleStatus.vehicleStatusCode = com.carrental.vehicleservice.model.constants.VehicleStatCodeEnum.AVI")
    Set<VehicleEntity> findAllAvailable();

    @Query("select v from vehicles v where v.vehicleStatus.vehicleStatusCode = com.carrental.vehicleservice.model.constants.VehicleStatCodeEnum.UAV")
    Set<VehicleEntity> findAllUnavailable();
}
