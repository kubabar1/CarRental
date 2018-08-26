package com.carrental.repository;

import java.math.BigDecimal;
import java.sql.Date;
import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.carrental.model.Vehicle;
import com.carrental.model.VehicleFilterWrapper;

public interface VehicleRepositoryCustom {

	public Page<Vehicle> getBestOfferCars(Pageable pageable);

	public Vehicle getVehicleUsingId(Long id);

	public List<Vehicle> getFiltredCarListForPage(VehicleFilterWrapper vehicleFilter, int page, int nb);

	public List<String> getBrandList();

	public List<String> getModelListForBrand(String brand);

	public List<String> getBodTypeList();

	public List<String> getCityList();

	public List<String> getColorList();

	public BigDecimal getMaxCost();

	public Integer getMaxSeatsNumber();

	public Integer getMaxDoorsNumber();

	public Date getMaxProductionYear();

	public Long getVehiclesCount();

}
