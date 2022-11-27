package com.carrental.ratingservice.listener;

import com.carrental.ratingservice.model.dto.AverageRateResponseDTO;
import com.carrental.ratingservice.service.RateService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;

import java.util.List;

public class VehicleRatingListener {

    private final RateService rateService;

    public VehicleRatingListener(RateService rateService) {
        this.rateService = rateService;
    }

    @RabbitListener(queues = {"getAverageVehiclesRatingQueue"})
    public List<AverageRateResponseDTO> getVehicleRatingsListener(List<Long> averageVehiclesRatingRequestDTO) {
        return rateService.getAverageRateForVehicles(averageVehiclesRatingRequestDTO);
    }
}
