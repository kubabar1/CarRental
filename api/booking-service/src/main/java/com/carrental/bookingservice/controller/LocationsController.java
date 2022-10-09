package com.carrental.bookingservice.controller;

import com.carrental.bookingservice.model.dto.LocationResponseDTO;
import com.carrental.bookingservice.service.LocationsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    public ResponseEntity<Page<LocationResponseDTO>> getLocationsController(Pageable pageable) {
        return ResponseEntity.ok().body(locationsService.getLocations(pageable));
    }
}
