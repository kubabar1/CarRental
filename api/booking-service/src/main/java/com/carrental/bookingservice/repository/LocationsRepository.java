package com.carrental.bookingservice.repository;

import com.carrental.bookingservice.model.entity.LocationEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Set;

public interface LocationsRepository extends PagingAndSortingRepository<LocationEntity, Long>  {

    Set<LocationEntity> findAll();

    Set<LocationEntity> findAllByCountry(String country);
}
