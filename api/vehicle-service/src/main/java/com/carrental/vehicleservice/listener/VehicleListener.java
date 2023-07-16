package com.carrental.vehicleservice.listener;

import com.carrental.vehicleservice.model.dto.AvailableVehiclesSearchDTO;
import com.carrental.vehicleservice.model.dto.VehicleResponseDTO;
import com.carrental.vehicleservice.service.VehicleService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;

import javax.transaction.Transactional;

@Transactional
public class VehicleListener {

    private final VehicleService vehicleService;

    public VehicleListener(VehicleService vehicleService) {
        this.vehicleService = vehicleService;
    }

    @RabbitListener(queues = {"getVehicleByIdQueue"})
    public VehicleResponseDTO getVehicleByIdListener(@Payload Long vehicleId) {
        return vehicleService.getVehicleByIdWithoutLocation(vehicleId);
    }
}
