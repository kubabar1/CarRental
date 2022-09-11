package com.carrental.vehicleservice.service;

import com.carrental.vehicleservice.model.dto.VehicleResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Map;

public interface FilteringService {

    Page<VehicleResponseDTO> filterVehicles(Map<String, String> filtersMap, Pageable pageable) throws NumberFormatException;

}
