package com.carrental.vehicleservice.service.impl;

import com.carrental.vehicleservice.model.dto.*;
import com.carrental.vehicleservice.model.entity.ColorEntity;
import com.carrental.vehicleservice.model.entity.EquipmentEntity;
import com.carrental.vehicleservice.model.entity.VehicleEntity;
import com.carrental.vehicleservice.repository.EquipmentRepository;
import com.carrental.vehicleservice.repository.VehicleRepository;
import com.carrental.vehicleservice.service.EquipmentService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

public class EquipmentServiceImpl implements EquipmentService {

    private final EquipmentRepository equipmentRepository;

    private final VehicleRepository vehicleRepository;

    private final ModelMapper modelMapper;

    public EquipmentServiceImpl(
            EquipmentRepository equipmentRepository,
            VehicleRepository vehicleRepository,
            ModelMapper modelMapper
    ) {
        this.equipmentRepository = equipmentRepository;
        this.vehicleRepository = vehicleRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Page<EquipmentResponseDTO> getAllEquipments(Pageable pageable) {
        Page<EquipmentEntity> equipmentEntities = equipmentRepository.findAll(pageable);
        List<EquipmentResponseDTO> equipmentResponseDTOS = equipmentEntities
                .getContent()
                .stream()
                .map(equipment -> modelMapper.map(equipment, EquipmentResponseDTO.class))
                .collect(Collectors.toList());
        return new PageImpl<>(equipmentResponseDTOS, pageable, equipmentEntities.getTotalElements());
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

    @Override
    public EquipmentResponseDTO addEquipment(EquipmentAddDTO equipmentAddDTO) {
        EquipmentEntity equipmentEntity = equipmentRepository.save(modelMapper.map(equipmentAddDTO, EquipmentEntity.class));
        return modelMapper.map(equipmentEntity, EquipmentResponseDTO.class);
    }

    private VehicleResponseDTO addEquipmentToVehicle(VehicleEntity vehicleEntity, String equipmentCode) {
        EquipmentEntity equipmentEntity = equipmentRepository.findById(equipmentCode).orElseThrow();
        vehicleEntity.getEquipments().add(equipmentEntity);
        return modelMapper.map(vehicleRepository.save(vehicleEntity), VehicleResponseDTO.class);
    }
}
