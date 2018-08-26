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
	public List<Vehicle> getFiltredCarListForPage(VehicleFilterWrapper vehicleFilter, int page, int nb) {
		return vehicleRepository.getFiltredCarListForPage(vehicleFilter, page, nb);
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
	public BigDecimal getMaxCost() {
		return vehicleRepository.getMaxCost();
	}

	@Override
	public Integer getMaxSeatsNumber() {
		return vehicleRepository.getMaxSeatsNumber();
	}

	@Override
	public Integer getMaxDoorsNumber() {
		return vehicleRepository.getMaxDoorsNumber();
	}

	@Override
	public Integer getMaxProductionYear() {
		Calendar cal = Calendar.getInstance();
		cal.setTime(vehicleRepository.getMaxProductionYear());

		return cal.get(Calendar.YEAR);
	}

	@Override
	public Long getVehiclesCount() {
		return vehicleRepository.getVehiclesCount();
	}

	@Override
	public Page<Vehicle> getAllVehicles(Pageable pageable) {
		return vehicleRepository.getAllVehicles(pageable);
	}

}
