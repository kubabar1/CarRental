package com.carrental.repository;

import java.util.List;

import com.carrental.model.Vehicle;

public interface VehicleRepositoryCustom {

	public List<Vehicle> getCarListForPage(int page, int nb);

	public List<Vehicle> getBestOfferCars(int page, int nb);
}
