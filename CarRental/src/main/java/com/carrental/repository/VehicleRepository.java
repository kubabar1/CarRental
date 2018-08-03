package com.carrental.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.carrental.model.User;
import com.carrental.model.Vehicle;

public interface VehicleRepository extends JpaRepository<Vehicle, Long>, VehicleRepositoryCustom {

	@Query("select v from Vehicle v")
	public List<Vehicle> getAllVehicles();

	public Vehicle getVehicleById(Long id);

}
