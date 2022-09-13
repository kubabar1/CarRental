package com.carrental.ratingservice.service.impl;

import com.carrental.ratingservice.model.dto.AverageRateResponseDTO;
import com.carrental.ratingservice.repository.RateRepository;
import com.carrental.ratingservice.service.RateService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;

@Service
public class RateServiceImpl implements RateService {

    @Autowired
    private RateRepository rateRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public AverageRateResponseDTO getAverageRateForVehicle(Long vehicleId) throws NoSuchElementException {
        AverageRateResponseDTO averageRateResponseDTO = new AverageRateResponseDTO();
        averageRateResponseDTO.setAverageRate(rateRepository.findAverageRatingByVehicleId(vehicleId));
        return modelMapper.map(averageRateResponseDTO, AverageRateResponseDTO.class);
    }
}
