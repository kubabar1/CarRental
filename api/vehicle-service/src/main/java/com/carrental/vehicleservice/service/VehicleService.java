package com.carrental.vehicleservice.service;

import com.carrental.vehicleservice.model.dto.VehicleFilterParamsDTO;
import com.carrental.vehicleservice.model.dto.VehiclePersistDTO;
import com.carrental.vehicleservice.model.dto.VehicleResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.NoSuchElementException;
import java.util.Set;

public interface VehicleService {

    Page<VehicleResponseDTO> getVehicles(Pageable pageable);

    Page<VehicleResponseDTO> getBestOffersVehicles(Pageable pageable);

    Set<VehicleResponseDTO> getAvailableVehicles();

    Page<VehicleResponseDTO> getUnavailableVehicles(Pageable pageable);

    VehicleResponseDTO getVehicleById(Long vehicleId) throws NoSuchElementException;

    VehicleResponseDTO addVehicle(VehiclePersistDTO vehiclePersistDTO);

    VehicleResponseDTO updateVehicleById(Long vehicleId, VehiclePersistDTO vehiclePersistDTO) throws NoSuchElementException;

    VehicleFilterParamsDTO getVehiclesFilterParams();

    Set<String> getVehicleModelsByBrand(String brand);
}
