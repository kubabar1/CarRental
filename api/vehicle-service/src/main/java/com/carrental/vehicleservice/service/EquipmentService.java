package com.carrental.vehicleservice.service;

import com.carrental.vehicleservice.model.dto.*;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.NoSuchElementException;
import java.util.Set;

public interface EquipmentService {

    Page<EquipmentResponseDTO> getAllEquipments(Pageable pageable);

    Set<EquipmentResponseDTO> getVehicleEquipments(Long vehicleId) throws NoSuchElementException;

    Set<EquipmentResponseDTO> getAllEquipmentsNotAssignedToVehicle(Long vehicleId) throws NoSuchElementException;

    VehicleResponseDTO addEquipmentsToVehicle(Long vehicleId, EquipmentSetPersistDTO equipmentSetPersistDTO) throws NoSuchElementException;

    VehicleResponseDTO removeEquipmentFromVehicle(Long vehicleId, EquipmentPersistDTO equipmentPersistDTO) throws NoSuchElementException;

    EquipmentResponseDTO addEquipment(EquipmentAddDTO equipmentAddDTO);
}
