package com.carrental.ratingservice.service;

import com.carrental.ratingservice.model.dto.AverageRateResponseDTO;
import com.carrental.ratingservice.model.dto.RateAddDTO;
import com.carrental.ratingservice.model.dto.RateResponseDTO;

import java.util.NoSuchElementException;

public interface RateService {

    RateResponseDTO addRate(RateAddDTO rateAddDTO);

    AverageRateResponseDTO getAverageRateForVehicle(Long vehicleId) throws NoSuchElementException;
}
