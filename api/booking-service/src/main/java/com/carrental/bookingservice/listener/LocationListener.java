package com.carrental.bookingservice.listener;

import com.carrental.bookingservice.model.dto.LocationResponseDTO;
import com.carrental.bookingservice.service.LocationsService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;

import java.util.Set;

public class LocationListener {

    private final LocationsService locationsService;

    public LocationListener(LocationsService locationsService) {
        this.locationsService = locationsService;
    }

    @RabbitListener(queues = {"getLocationQueue"})
    public Set<LocationResponseDTO> getLocationListener(@Payload(required = false) String country) {
        return locationsService.getAllLocations(country);
    }

    @RabbitListener(queues = {"getLocationByIdQueue"})
    public LocationResponseDTO getLocationByIdQueue(@Payload(required = false) Long locationId) {
        return locationsService.getLocationById(locationId);
    }
}
