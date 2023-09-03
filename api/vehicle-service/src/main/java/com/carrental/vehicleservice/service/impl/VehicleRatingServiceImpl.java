package com.carrental.vehicleservice.service.impl;

import com.carrental.vehicleservice.config.properties.VehicleServiceProperties;
import com.carrental.vehicleservice.model.dto.AverageRateResponseDTO;
import com.carrental.vehicleservice.model.dto.VehicleResponseDTO;
import com.carrental.vehicleservice.service.VehicleRatingService;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.core.ParameterizedTypeReference;

import java.util.List;
import java.util.stream.Collectors;

public class VehicleRatingServiceImpl implements VehicleRatingService {

    private final RabbitTemplate rabbitTemplate;

    private final VehicleServiceProperties vehicleServiceProperties;

    public VehicleRatingServiceImpl(RabbitTemplate rabbitTemplate, VehicleServiceProperties vehicleServiceProperties) {
        this.rabbitTemplate = rabbitTemplate;
        this.vehicleServiceProperties = vehicleServiceProperties;
    }

    @Override
    public void setVehiclesAverageRating(List<VehicleResponseDTO> vehicles) {
        List<Long> vehicleIds = vehicles.stream().map(VehicleResponseDTO::getId).collect(Collectors.toList());
        List<AverageRateResponseDTO> averageRateResponseListDTO = rabbitTemplate.convertSendAndReceiveAsType(
                vehicleServiceProperties.getGetAverageVehiclesRatingQueue(), vehicleIds, new ParameterizedTypeReference<>() {
                });

        if (averageRateResponseListDTO != null) {
            averageRateResponseListDTO.forEach(avgRate ->
                    vehicles.stream()
                            .filter(vehicle -> vehicle.getId().equals(avgRate.getVehicleId()))
                            .findFirst()
                            .ifPresent(vehicle -> vehicle.setAverageRate(avgRate.getAverageRate()))
            );
        }
    }
}
