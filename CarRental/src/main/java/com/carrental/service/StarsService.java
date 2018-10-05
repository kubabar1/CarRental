package com.carrental.service;

import java.util.List;

import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.carrental.model.Stars;

public interface StarsService {

	public void addStars(Stars stars);

	public List<Stars> getStarsByVehicleId(Long vehicleId);

	public Double getAvgStarsByVehicleId(Long vehicleId);

}
