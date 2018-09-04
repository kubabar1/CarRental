package com.carrental.service;

import java.math.BigDecimal;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.carrental.dto.VehicleFilterDto;
import com.carrental.model.Vehicle;
import com.carrental.model.VehicleParameters;

public interface VehicleService {
	
	public List<Vehicle> getAllVehicles();
	
	public Page<Vehicle> getVehiclesForPage(Pageable pageable);

	public Page<Vehicle> getBestOfferCars(Pageable pageable);
	
	public List<Vehicle> getVehicleListForCity(String city);

	public Vehicle getVehicleById(Long id);

	public Page<Vehicle> getFiltredCarListForPage(VehicleFilterDto vehicleFilter, Pageable pageable);

	public List<String> getBrandList();

	public List<String> getModelListForBrand(String brand);

	public List<String> getBodTypeList();

	public List<String> getCityList();

	public List<String> getColorList();


}
