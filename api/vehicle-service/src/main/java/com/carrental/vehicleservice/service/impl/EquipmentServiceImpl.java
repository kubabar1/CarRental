package com.carrental.vehicleservice.service.impl;

import com.carrental.vehicleservice.model.dto.EquipmentPersistDTO;
import com.carrental.vehicleservice.model.dto.EquipmentResponseDTO;
import com.carrental.vehicleservice.model.dto.EquipmentSetPersistDTO;
import com.carrental.vehicleservice.model.dto.VehicleResponseDTO;
import com.carrental.vehicleservice.model.entity.EquipmentEntity;
import com.carrental.vehicleservice.model.entity.VehicleEntity;
import com.carrental.vehicleservice.repository.EquipmentRepository;
import com.carrental.vehicleservice.repository.VehicleRepository;
import com.carrental.vehicleservice.service.EquipmentService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class EquipmentServiceImpl implements EquipmentService {

    @Autowired
    private EquipmentRepository equipmentRepository;

    @Autowired
    private VehicleRepository vehicleRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public Set<EquipmentResponseDTO> getAllEquipments() {
        return equipmentRepository
                .findAll()
                .stream()
                .map(equipmentEntity -> modelMapper.map(equipmentEntity, EquipmentResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public Set<EquipmentResponseDTO> getVehicleEquipments(Long vehicleId) throws NoSuchElementException {
        return vehicleRepository
                .findById(vehicleId)
                .orElseThrow()
                .getEquipments()
                .stream()
                .map(equipment -> modelMapper.map(equipment, EquipmentResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public Set<EquipmentResponseDTO> getAllEquipmentsNotAssignedToVehicle(Long vehicleId) throws NoSuchElementException {
        return equipmentRepository
                .getAllEquipmentsNotAssignedToVehicle(vehicleId)
                .stream()
                .map(equipmentEntity -> modelMapper.map(equipmentEntity, EquipmentResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public VehicleResponseDTO addEquipmentsToVehicle(Long vehicleId, EquipmentSetPersistDTO equipmentSetPersistDTO) throws NoSuchElementException {
        VehicleEntity vehicleEntity = vehicleRepository.findById(vehicleId).orElseThrow();
        equipmentSetPersistDTO.getEquipments().forEach(equipmentPersistDTO -> {
            addEquipmentToVehicle(vehicleEntity, equipmentPersistDTO.getEquipmentCode());
        });
        return modelMapper.map(vehicleEntity, VehicleResponseDTO.class);
    }

    @Override
    public VehicleResponseDTO removeEquipmentFromVehicle(Long vehicleId, EquipmentPersistDTO equipmentPersistDTO) throws NoSuchElementException {
        VehicleEntity vehicleEntity = vehicleRepository.findById(vehicleId).orElseThrow();
        vehicleEntity
                .getEquipments()
                .removeIf(equipmentEntity -> equipmentEntity.getEquipmentCode().equals(equipmentPersistDTO.getEquipmentCode()));
        VehicleEntity vehicleEntityAfterUpdate = vehicleRepository.save(vehicleEntity);
        return modelMapper.map(vehicleEntityAfterUpdate, VehicleResponseDTO.class);
    }

    private VehicleResponseDTO addEquipmentToVehicle(VehicleEntity vehicleEntity, String equipmentCode) {
        EquipmentEntity equipmentEntity = equipmentRepository.findById(equipmentCode).orElseThrow();
        vehicleEntity.getEquipments().add(equipmentEntity);
        return modelMapper.map(vehicleRepository.save(vehicleEntity), VehicleResponseDTO.class);
    }
}
