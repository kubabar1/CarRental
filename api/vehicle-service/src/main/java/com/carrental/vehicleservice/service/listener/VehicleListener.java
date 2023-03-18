package com.carrental.vehicleservice.service.listener;

import com.carrental.vehicleservice.model.dto.VehicleResponseDTO;
import com.carrental.vehicleservice.model.entity.VehicleEntity;
import com.carrental.vehicleservice.repository.VehicleRepository;
import org.modelmapper.ModelMapper;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;

import javax.transaction.Transactional;

@Transactional
public class VehicleListener {

    private final VehicleRepository vehicleRepository;

    private final ModelMapper modelMapper;

    public VehicleListener(VehicleRepository vehicleRepository, ModelMapper modelMapper) {
        this.vehicleRepository = vehicleRepository;
        this.modelMapper = modelMapper;
    }

    @RabbitListener(queues = {"getVehicleByIdQueue"})
    public VehicleResponseDTO getVehicleByIdListener(@Payload Long vehicleId) {
        VehicleEntity vehicleEntity = vehicleRepository.findById(vehicleId).orElse(null);
        return vehicleEntity != null ? modelMapper.map(vehicleEntity, VehicleResponseDTO.class) : null;
    }
}
