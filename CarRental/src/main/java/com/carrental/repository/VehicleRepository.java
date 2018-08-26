package com.carrental.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.model.User;
import com.carrental.model.Vehicle;

public interface VehicleRepository extends  PagingAndSortingRepository<Vehicle, Long>, VehicleRepositoryCustom {

	@Query(value="SELECT v FROM Vehicle v LEFT JOIN FETCH v.equipmentList",
			countQuery = "SELECT COUNT(v) FROM Vehicle v")
    Page<Vehicle> getAllVehicles(Pageable pageable);
	

}
