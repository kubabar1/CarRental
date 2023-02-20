package com.carrental.vehicleservice.repository;

import com.carrental.vehicleservice.model.entity.VehicleEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.Set;

public interface VehicleRepository extends PagingAndSortingRepository<VehicleEntity, Long> {

    Set<VehicleEntity> findAll();

    @Query("select v from vehicles v where v.vehicleStatus.vehicleStatusCode = com.carrental.vehicleservice.model.constants.VehicleStatCodeEnum.AVI")
    Set<VehicleEntity> findAllAvailable();

    @Query("select v from vehicles v where v.vehicleStatus.vehicleStatusCode = com.carrental.vehicleservice.model.constants.VehicleStatCodeEnum.UAV")
    Page<VehicleEntity> findAllUnavailable(Pageable pageable);

    Page<VehicleEntity> findByBestOfferTrue(Pageable pageable);
}
