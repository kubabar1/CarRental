package com.carrental.vehicleservice.service;

import com.carrental.vehicleservice.model.dto.VehicleResponseDTO;

import java.util.Map;
import java.util.List;

public interface FilteringService {

    List<VehicleResponseDTO> filterVehicles(Map<String, String> filtersMap) throws NumberFormatException;

}
