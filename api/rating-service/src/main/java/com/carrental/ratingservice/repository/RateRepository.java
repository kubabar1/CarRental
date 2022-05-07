package com.carrental.ratingservice.repository;

import com.carrental.ratingservice.model.entity.RateEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.Set;

public interface RateRepository extends PagingAndSortingRepository<RateEntity, Long> {

    Set<RateEntity> findAll();

    @Query("SELECT AVG(r.rate) FROM rates r where r.vehicleId = :vehicleId GROUP BY r.vehicleId")
    Double findAverageRatingByVehicleId(@Param("vehicleId") Long vehicleId);
}
