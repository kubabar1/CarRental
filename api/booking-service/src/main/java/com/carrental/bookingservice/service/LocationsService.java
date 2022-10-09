package com.carrental.bookingservice.service;

import com.carrental.bookingservice.model.dto.LocationResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Set;

public interface LocationsService {

    Page<LocationResponseDTO> getLocations(Pageable pageable);

}
