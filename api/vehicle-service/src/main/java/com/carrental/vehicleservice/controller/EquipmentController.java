package com.carrental.vehicleservice.controller;

import com.carrental.vehicleservice.model.dto.EquipmentPersistDTO;
import com.carrental.vehicleservice.model.dto.EquipmentSetPersistDTO;
import com.carrental.vehicleservice.model.dto.EquipmentResponseDTO;
import com.carrental.vehicleservice.model.dto.VehicleResponseDTO;
import com.carrental.vehicleservice.service.EquipmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.NoSuchElementException;
import java.util.Set;

@CrossOrigin
@RequestMapping(value = "/equipments")
public class EquipmentController {

    private final EquipmentService equipmentService;

    public EquipmentController(EquipmentService equipmentService) {
        this.equipmentService = equipmentService;
    }

    @GetMapping
    public ResponseEntity<Page<EquipmentResponseDTO>> getAllEquipmentsController(Pageable pageable) {
        return ResponseEntity.ok().body(equipmentService.getAllEquipments(pageable));
    }

    @GetMapping(value = "/{vehicleId}")
    public ResponseEntity<Set<EquipmentResponseDTO>> getVehicleEquipmentsController(
            @PathVariable(name = "vehicleId") Long vehicleId) {
        try {
            Set<EquipmentResponseDTO> equipmentResponseDTOS = equipmentService.getVehicleEquipments(vehicleId);
            if (equipmentResponseDTOS.isEmpty()) {
                return ResponseEntity.noContent().build();
            }
            return ResponseEntity.ok().body(equipmentResponseDTOS);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @GetMapping(value = "/not-assigned/{vehicleId}")
    public ResponseEntity<Set<EquipmentResponseDTO>> getAllEquipmentsNotAssignedToVehicleController(
            @PathVariable(name = "vehicleId") Long vehicleId) {
        try {
            Set<EquipmentResponseDTO> equipmentResponseDTOS = equipmentService.getAllEquipmentsNotAssignedToVehicle(vehicleId);
            return ResponseEntity.ok().body(equipmentResponseDTOS);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/add/{vehicleId}")
    public ResponseEntity<VehicleResponseDTO> addEquipmentsToVehicleController(
            @PathVariable(name = "vehicleId") Long vehicleId,
            @Valid @RequestBody EquipmentSetPersistDTO equipmentPersistDTO) {
        try {
            return ResponseEntity.ok().body(equipmentService.addEquipmentsToVehicle(vehicleId, equipmentPersistDTO));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PostMapping(value = "/remove/{vehicleId}")
    public ResponseEntity<VehicleResponseDTO> removeEquipmentFromVehicleController(
            @PathVariable(name = "vehicleId") Long vehicleId,
            @Valid @RequestBody EquipmentPersistDTO equipmentPersistDTO) {
        try {
            return ResponseEntity.ok().body(equipmentService.removeEquipmentFromVehicle(vehicleId, equipmentPersistDTO));
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }
}
