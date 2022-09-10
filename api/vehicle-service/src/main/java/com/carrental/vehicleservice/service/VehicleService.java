package com.carrental.vehicleservice.service;

import com.carrental.vehicleservice.model.dto.VehicleFilterParamsDTO;
import com.carrental.vehicleservice.model.dto.VehiclePersistDTO;
import com.carrental.vehicleservice.model.dto.VehicleResponseDTO;

import java.util.NoSuchElementException;
import java.util.Set;

public interface VehicleService {

    Set<VehicleResponseDTO> getVehicles();

    Set<VehicleResponseDTO> getAvailableVehicles();

    Set<VehicleResponseDTO> getUnavailableVehicles();

    VehicleResponseDTO getVehicleById(Long vehicleId) throws NoSuchElementException;

    VehicleResponseDTO addVehicle(VehiclePersistDTO vehiclePersistDTO);

    VehicleResponseDTO updateVehicleById(Long vehicleId, VehiclePersistDTO vehiclePersistDTO) throws NoSuchElementException;

    VehicleFilterParamsDTO getVehiclesFilterParams();

    Set<String> getVehicleModelsByBrand(String brand);
}
