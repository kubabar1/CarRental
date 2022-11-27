package com.carrental.ratingservice.service.impl;

import com.carrental.ratingservice.model.dto.AverageRateResponseDTO;
import com.carrental.ratingservice.repository.RateRepository;
import com.carrental.ratingservice.service.RateService;

import java.util.List;

public class RateServiceImpl implements RateService {

    private final RateRepository rateRepository;

    public RateServiceImpl(RateRepository rateRepository) {
        this.rateRepository = rateRepository;
    }

    @Override
    public AverageRateResponseDTO getAverageRateForVehicle(Long vehicleId) {
        AverageRateResponseDTO averageRateResponseDTO = new AverageRateResponseDTO();
        averageRateResponseDTO.setVehicleId(vehicleId);
        averageRateResponseDTO.setAverageRate(rateRepository.findAverageRatingByVehicleId(vehicleId));
        return averageRateResponseDTO;
    }

    @Override
    public List<AverageRateResponseDTO> getAverageRateForVehicles(List<Long> vehiclesId) {
        return rateRepository.findAverageRatingListByVehiclesId(vehiclesId);
    }
}
