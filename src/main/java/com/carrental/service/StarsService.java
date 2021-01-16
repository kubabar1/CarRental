package com.carrental.service;

import com.carrental.model.Stars;

import java.util.List;

public interface StarsService {

  public void addStars(Stars stars);

  public List<Stars> getStarsByVehicleId(Long vehicleId);

  public Double getAvgStarsByVehicleId(Long vehicleId);
}
