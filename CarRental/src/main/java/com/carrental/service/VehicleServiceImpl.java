package com.carrental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.model.Vehicle;
import com.carrental.model.VehicleParameters;
import com.carrental.repository.VehicleRepository;

@Service("vehicleService")
@Transactional
public class VehicleServiceImpl implements VehicleService {

	@Autowired
	private VehicleRepository vehicleRepository;

	@Override
	public List<Vehicle> getAllVehicles() {
		return vehicleRepository.getAllVehicles();
	}

	@Override
	public List<Vehicle> getCarListForPage(int page, int nb) {
		return vehicleRepository.getCarListForPage(page, nb);
	}

	@Override
	public List<Vehicle> getBestOfferCars(int page, int nb) {
		return vehicleRepository.getBestOfferCars(page, nb);
	}

	@Override
	public Vehicle getVehicleById(Long id) {
		return vehicleRepository.getVehicleById(id);
	}

}
