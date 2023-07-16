package com.carrental.bookingservice.controller;

import com.carrental.bookingservice.model.dto.LocationAddDTO;
import com.carrental.bookingservice.model.dto.LocationResponseDTO;
import com.carrental.bookingservice.model.dto.LocationsResponseDTO;
import com.carrental.bookingservice.service.LocationsService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RequestMapping(value = "/locations")
public class LocationsController {

    private final LocationsService locationsService;

    public LocationsController(LocationsService locationsService) {
        this.locationsService = locationsService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<LocationResponseDTO>> getLocationsController(
            @RequestParam(value = "filter", required = false) String filter, Pageable pageable) {
        return ResponseEntity.ok().body(locationsService.getLocations(pageable, filter));
    }

    @GetMapping
    @RequestMapping(value = "/all")
    public ResponseEntity<LocationsResponseDTO> getAllLocationsController() {
        return ResponseEntity.ok().body(new LocationsResponseDTO(locationsService.getAllLocations(null)));
    }

    @PutMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<LocationResponseDTO> addLocationController(@Valid @RequestBody LocationAddDTO locationAddDTO) {
        return ResponseEntity.ok().body(locationsService.addLocation(locationAddDTO));
    }
}
