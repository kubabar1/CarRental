package com.carrental.service;

import java.math.BigDecimal;
import java.util.Calendar;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.model.Vehicle;
import com.carrental.model.VehicleFilterWrapper;
import com.carrental.model.VehicleParameters;
import com.carrental.repository.VehicleRepository;

@Service("vehicleService")
@Transactional
public class VehicleServiceImpl implements VehicleService {

	@Autowired
	private VehicleRepository vehicleRepository;

	@Override
	public Page<Vehicle> getBestOfferCars(Pageable pageable) {
		return vehicleRepository.getBestOfferCars(pageable);
	}

	@Override
	public Vehicle getVehicleById(Long id) {
		return vehicleRepository.getVehicleUsingId(id);
	}

	@Override
	public Page<Vehicle> getFiltredCarListForPage(VehicleFilterWrapper vehicleFilter, Pageable pageable) {
		return vehicleRepository.getFiltredCarListForPage(vehicleFilter, pageable);
	}

	@Override
	public List<String> getBrandList() {
		return vehicleRepository.getBrandList();
	}

	@Override
	public List<String> getModelListForBrand(String brand) {
		return vehicleRepository.getModelListForBrand(brand);
	}

	@Override
	public List<String> getBodTypeList() {
		return vehicleRepository.getBodTypeList();
	}

	@Override
	public List<String> getCityList() {
		return vehicleRepository.getCityList();
	}

	@Override
	public List<String> getColorList() {
		return vehicleRepository.getColorList();
	}

	@Override
	public Page<Vehicle> getVehiclesForPage(Pageable pageable) {
		return vehicleRepository.getVehiclesForPage(pageable);
	}

	@Override
	public List<Vehicle> getAllVehicles() {
		return vehicleRepository.getAllVehicles();
	}

	@Override
	public List<Vehicle> getVehicleListForCity(String city) {
		return vehicleRepository.getVehicleListForCity(city);
	}

}
