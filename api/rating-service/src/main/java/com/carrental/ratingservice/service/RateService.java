package com.carrental.ratingservice.service;

import com.carrental.ratingservice.model.dto.AverageRateResponseDTO;

import java.util.List;

public interface RateService {

    AverageRateResponseDTO getAverageRateForVehicle(Long vehicleId);

    List<AverageRateResponseDTO> getAverageRateForVehicles(List<Long> vehiclesId);
}
