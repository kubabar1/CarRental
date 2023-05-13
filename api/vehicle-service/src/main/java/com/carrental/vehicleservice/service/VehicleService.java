package com.carrental.vehicleservice.service;

import com.carrental.vehicleservice.model.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.EntityNotFoundException;
import javax.swing.text.html.Option;
import java.io.IOException;
import java.util.NoSuchElementException;
import java.util.Set;

public interface VehicleService {

    Page<VehicleResponseDTO> getVehicles(Pageable pageable, String filterString);

    Page<VehicleResponseDTO> getBestOffersVehicles(Pageable pageable);

    Set<VehicleResponseDTO> getAvailableVehicles();

    Page<VehicleResponseDTO> getUnavailableVehicles(Pageable pageable);

    VehicleResponseDTO getVehicleById(Long vehicleId) throws NoSuchElementException;

    Set<VehicleResponseDTO> getAvailableVehiclesByLocation(Long locationId);

    VehicleResponseDTO addVehicle(VehiclePersistDTO vehiclePersistDTO, MultipartFile vehicleImage) throws IOException;

    VehicleResponseDTO updateVehicleById(Long vehicleId, VehiclePersistDTO vehiclePersistDTO, MultipartFile vehicleImage) throws NoSuchElementException, IOException;

    VehicleOptionsDTO getVehiclesOptions();

    Set<String> getVehicleModelsByBrand(String brand);

    OptionDTO addBrand(OptionDTO optionDTO);

    OptionDTO addBodyType(OptionDTO optionDTO);

    OptionDTO addFuelType(OptionDTO optionDTO);

    OptionDTO addColor(OptionDTO optionDTO);

    VehicleModelDTO addVehicleModel(VehicleModelDTO vehicleModelDTO);

    VehicleOptionsWithAssocCountDTO getVehiclesOptionsWithAssocCnt();

    OptionDTO deleteBrand(String brand) throws EntityNotFoundException;

    OptionDTO deleteModel(String model) throws EntityNotFoundException;

    OptionDTO deleteBodyType(String bodyType) throws EntityNotFoundException;

    OptionDTO deleteFuelType(String fuelType) throws EntityNotFoundException;

    OptionDTO deleteColor(String color) throws EntityNotFoundException;
}
