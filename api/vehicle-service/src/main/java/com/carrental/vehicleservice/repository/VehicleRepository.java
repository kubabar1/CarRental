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

    @Query("select distinct v.brand from vehicles v")
    Set<String> findAllBrands();

    @Query("select distinct v.model from vehicles v where UPPER(v.brand) LIKE CONCAT('%', UPPER(:brand), '%')")
    Set<String> findAllModelsByBrand(@Param("brand") String brand);

    @Query("select distinct v.vehicleDetails.bodyType from vehicles v")
    Set<String> findAllBodyTypes();

    @Query("select distinct v.vehicleDetails.color from vehicles v")
    Set<String> findAllColors();

    @Query("select min(v.vehicleDetails.doorsNumber) from vehicles v")
    Integer findMinDoorCount();

    @Query("select max(v.vehicleDetails.doorsNumber) from vehicles v")
    Integer findMaxDoorCount();

    @Query("select min(v.dailyFee) from vehicles v")
    BigDecimal findMinPrice();

    @Query("select max(v.dailyFee) from vehicles v")
    BigDecimal findMaxPrice();

    @Query("select min(v.vehicleDetails.productionYear) from vehicles v")
    Integer findMinProductionYear();

    @Query("select max(v.vehicleDetails.productionYear) from vehicles v")
    Integer findMaxProductionYear();

    @Query("select min(v.vehicleDetails.seatsNumber) from vehicles v")
    Integer findMinSeatsCount();

    @Query("select max(v.vehicleDetails.seatsNumber) from vehicles v")
    Integer findMaxSeatsCount();
}
