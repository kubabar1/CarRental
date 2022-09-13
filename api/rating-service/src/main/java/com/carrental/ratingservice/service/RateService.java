package com.carrental.ratingservice.service;

import com.carrental.ratingservice.model.dto.AverageRateResponseDTO;

import java.util.NoSuchElementException;

public interface RateService {

    AverageRateResponseDTO getAverageRateForVehicle(Long vehicleId) throws NoSuchElementException;
}
