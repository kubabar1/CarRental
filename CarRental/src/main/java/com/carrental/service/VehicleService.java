package com.carrental.service;

import java.util.List;

import com.carrental.model.Vehicle;
import com.carrental.model.VehicleParameters;

public interface VehicleService {

	public List<Vehicle> getAllVehicles();

	public List<Vehicle> getCarListForPage(int page, int nb);

	public List<Vehicle> getBestOfferCars(int page, int nb);

	public Vehicle getVehicleById(Long id);

}
