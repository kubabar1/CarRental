package com.carrental.bookingservice.controller;

import com.carrental.bookingservice.model.dto.LocationResponseDTO;
import com.carrental.bookingservice.service.LocationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@CrossOrigin
@RequestMapping(value = "/locations")
public class LocationsController {

    private final LocationsService locationsService;

    public LocationsController(LocationsService locationsService) {
        this.locationsService = locationsService;
    }

    @GetMapping
    public ResponseEntity<Set<LocationResponseDTO>> getLocationsController() {
        Set<LocationResponseDTO> locationResponseDTOSet = locationsService.getLocations();
        if (locationResponseDTOSet.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(locationResponseDTOSet);
    }
}
