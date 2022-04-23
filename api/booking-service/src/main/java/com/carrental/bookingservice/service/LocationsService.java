package com.carrental.bookingservice.service;

import com.carrental.bookingservice.model.dto.LocationResponseDTO;

import java.util.Set;

public interface LocationsService {

    Set<LocationResponseDTO> getLocations();

}
