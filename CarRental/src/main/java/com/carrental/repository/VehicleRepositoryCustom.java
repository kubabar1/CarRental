package com.carrental.repository;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.carrental.model.Vehicle;
import com.carrental.model.VehicleFilterWrapper;

public interface VehicleRepositoryCustom {

	public Vehicle getVehicleUsingId(Long id);

	public Page<Vehicle> getFiltredCarListForPage(VehicleFilterWrapper vehicleFilter, Pageable pageable);
	
	public List<Vehicle> getVehicleListForCity(String city);

	public List<String> getBrandList();

	public List<String> getModelListForBrand(String brand);

	public List<String> getBodTypeList();

	public List<String> getCityList();

	public List<String> getColorList();

}
