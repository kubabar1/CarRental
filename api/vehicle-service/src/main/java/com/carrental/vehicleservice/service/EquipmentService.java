package com.carrental.vehicleservice.service;

import com.carrental.vehicleservice.model.dto.EquipmentPersistDTO;
import com.carrental.vehicleservice.model.dto.EquipmentResponseDTO;
import com.carrental.vehicleservice.model.dto.EquipmentSetPersistDTO;
import com.carrental.vehicleservice.model.dto.VehicleResponseDTO;

import java.util.NoSuchElementException;
import java.util.Set;

public interface EquipmentService {

    Set<EquipmentResponseDTO> getAllEquipments();

    Set<EquipmentResponseDTO> getVehicleEquipments(Long vehicleId) throws NoSuchElementException;

    Set<EquipmentResponseDTO> getAllEquipmentsNotAssignedToVehicle(Long vehicleId) throws NoSuchElementException;

    VehicleResponseDTO addEquipmentsToVehicle(Long vehicleId, EquipmentSetPersistDTO equipmentSetPersistDTO) throws NoSuchElementException;

    VehicleResponseDTO removeEquipmentFromVehicle(Long vehicleId, EquipmentPersistDTO equipmentPersistDTO) throws NoSuchElementException;
}
