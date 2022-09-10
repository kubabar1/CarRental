package com.carrental.vehicleservice.service.impl;

import com.carrental.vehicleservice.model.dto.VehicleFilterParamsDTO;
import com.carrental.vehicleservice.model.dto.VehiclePersistDTO;
import com.carrental.vehicleservice.model.dto.VehicleResponseDTO;
import com.carrental.vehicleservice.model.entity.VehicleEntity;
import com.carrental.vehicleservice.repository.VehicleRepository;
import com.carrental.vehicleservice.service.VehicleService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashSet;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class VehicleServiceImpl implements VehicleService {

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public Set<VehicleResponseDTO> getVehicles() {
        return vehicleRepository
                .findAll()
                .stream()
                .map(vehicleEntity -> modelMapper.map(vehicleEntity, VehicleResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public Set<VehicleResponseDTO> getAvailableVehicles() {
        return vehicleRepository
                .findAllAvailable()
                .stream()
                .map(vehicleEntity -> modelMapper.map(vehicleEntity, VehicleResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public Set<VehicleResponseDTO> getUnavailableVehicles() {
        return vehicleRepository
                .findAllUnavailable()
                .stream()
                .map(vehicleEntity -> modelMapper.map(vehicleEntity, VehicleResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public VehicleResponseDTO getVehicleById(Long vehicleId) throws NoSuchElementException {
        VehicleEntity vehicleEntity = vehicleRepository.findById(vehicleId).orElseThrow();
        return modelMapper.map(vehicleEntity, VehicleResponseDTO.class);
    }

    @Override
    public VehicleResponseDTO addVehicle(VehiclePersistDTO vehiclePersistDTO) {
        VehicleEntity vehicleEntity = vehicleRepository.save(modelMapper.map(vehiclePersistDTO, VehicleEntity.class));
        return modelMapper.map(vehicleEntity, VehicleResponseDTO.class);
    }

    @Override
    public VehicleResponseDTO updateVehicleById(Long vehicleId, VehiclePersistDTO vehiclePersistDTO) throws NoSuchElementException {
        VehicleEntity vehicleEntityToUpdate = vehicleRepository.findById(vehicleId).orElseThrow();
        modelMapper.map(vehiclePersistDTO, vehicleEntityToUpdate);
        vehicleEntityToUpdate.setId(vehicleId);
        VehicleEntity vehicleEntityAfterUpdate = vehicleRepository.save(vehicleEntityToUpdate);
        return modelMapper.map(vehicleEntityAfterUpdate, VehicleResponseDTO.class);
    }

    @Override
    public VehicleFilterParamsDTO getVehiclesFilterParams() {
        VehicleFilterParamsDTO vehicleFilterParamsDTO = new VehicleFilterParamsDTO();
        vehicleFilterParamsDTO.setBodyTypes(vehicleRepository.findAllBodyTypes());
        vehicleFilterParamsDTO.setBrands(vehicleRepository.findAllBrands());
//        vehicleFilterParamsDTO.setCities(vehicleRepository.findAllCities());
        vehicleFilterParamsDTO.setColors(vehicleRepository.findAllColors());
        vehicleFilterParamsDTO.setMinDoorCount(vehicleRepository.findMinDoorCount());
        vehicleFilterParamsDTO.setMaxDoorCount(vehicleRepository.findMaxDoorCount());
        vehicleFilterParamsDTO.setMinPrice(vehicleRepository.findMinPrice());
        vehicleFilterParamsDTO.setMaxPrice(vehicleRepository.findMaxPrice());
        vehicleFilterParamsDTO.setMinProductionYear(vehicleRepository.findMinProductionYear());
        vehicleFilterParamsDTO.setMaxProductionYear(vehicleRepository.findMaxProductionYear());
        vehicleFilterParamsDTO.setMinSeatsCount(vehicleRepository.findMinSeatsCount());
        vehicleFilterParamsDTO.setMaxSeatsCount(vehicleRepository.findMaxSeatsCount());
        return vehicleFilterParamsDTO;
    }

    @Override
    public Set<String> getVehicleModelsByBrand(String brand) {
        if (brand != null) {
            return vehicleRepository.findAllModelsByBrand(brand.toUpperCase());
        }
        return new HashSet<>();
    }
}
