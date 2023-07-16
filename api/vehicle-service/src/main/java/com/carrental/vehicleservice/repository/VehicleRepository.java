package com.carrental.vehicleservice.repository;

import com.carrental.vehicleservice.model.entity.VehicleEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.Optional;
import java.util.Set;

public interface VehicleRepository extends PagingAndSortingRepository<VehicleEntity, Long>, JpaSpecificationExecutor<VehicleEntity> {

    Set<VehicleEntity> findAll();

    Set<VehicleEntity> findAllByIdNotInAndLocationId(Set<Long> vehicleIds, Long locationId);

    Optional<VehicleEntity> findByRegistration(String registration);

    Page<VehicleEntity> findByBestOfferTrue(Pageable pageable);
}
