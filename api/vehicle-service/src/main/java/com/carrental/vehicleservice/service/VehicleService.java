package com.carrental.vehicleservice.service;

import com.carrental.vehicleservice.model.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.NoSuchElementException;
import java.util.Set;

public interface VehicleService {

    Page<VehicleResponseDTO> getVehicles(Pageable pageable);

    Page<VehicleResponseDTO> getBestOffersVehicles(Pageable pageable);

    Set<VehicleResponseDTO> getAvailableVehicles();

    Page<VehicleResponseDTO> getUnavailableVehicles(Pageable pageable);

    VehicleResponseDTO getVehicleById(Long vehicleId) throws NoSuchElementException;

    VehicleResponseDTO addVehicle(VehiclePersistDTO vehiclePersistDTO, MultipartFile vehicleImage) throws IOException;

    VehicleResponseDTO updateVehicleById(Long vehicleId, VehiclePersistDTO vehiclePersistDTO, MultipartFile vehicleImage) throws NoSuchElementException, IOException;

    VehicleOptionsDTO getVehiclesOptions();

    Set<String> getVehicleModelsByBrand(String brand);

    OptionDTO addBrand(OptionDTO optionDTO);

    OptionDTO addBodyType(OptionDTO optionDTO);

    OptionDTO addFuelType(OptionDTO optionDTO);

    OptionDTO addColor(OptionDTO optionDTO);

    VehicleModelDTO addVehicleModel(VehicleModelDTO vehicleModelDTO);
}
