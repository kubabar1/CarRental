package com.carrental.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.dto.VehicleAddDto;
import com.carrental.model.User;
import com.carrental.model.Vehicle;

public interface VehicleRepository extends  PagingAndSortingRepository<Vehicle, Long>, VehicleRepositoryCustom {

	@Transactional
	@Query(value="SELECT DISTINCT v FROM Vehicle v LEFT JOIN FETCH v.equipmentList ORDER BY v.brand ASC, v.model ASC",
			countQuery = "SELECT COUNT(v) FROM Vehicle v")
    public Page<Vehicle> getVehiclesForPage(Pageable pageable);
	
	@Transactional
	@Query(value="SELECT DISTINCT v FROM Vehicle v LEFT JOIN FETCH v.equipmentList WHERE v.bestOffer = 1 ORDER BY v.brand ASC, v.model ASC",
			countQuery = "SELECT COUNT(v) FROM Vehicle v WHERE v.bestOffer = 1")
	public Page<Vehicle> getBestOfferCars(Pageable pageable);
	
	@Transactional
	@Query(value="SELECT DISTINCT v FROM Vehicle v LEFT JOIN FETCH v.equipmentList ORDER BY v.brand ASC, v.model ASC")
    public List<Vehicle> getAllVehicles();

}
