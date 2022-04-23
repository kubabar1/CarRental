package com.carrental.vehicleservice.controller;

import com.carrental.vehicleservice.model.dto.VehiclePersistDTO;
import com.carrental.vehicleservice.model.dto.VehicleResponseDTO;
import com.carrental.vehicleservice.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.NoSuchElementException;
import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping(value = "/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;


    @GetMapping
    public ResponseEntity<Set<VehicleResponseDTO>> getVehiclesController() {
        Set<VehicleResponseDTO> vehicleResponseDTOSet = vehicleService.getVehicles();
        if (vehicleResponseDTOSet.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(vehicleResponseDTOSet);
    }

    @GetMapping(value = "/available")
    public ResponseEntity<Set<VehicleResponseDTO>> getAvailableVehiclesController() {
        Set<VehicleResponseDTO> availableVehicles = vehicleService.getAvailableVehicles();
        if (availableVehicles.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(availableVehicles);
    }

    @GetMapping(value = "/unavailable")
    public ResponseEntity<Set<VehicleResponseDTO>> getUnavailableVehiclesController() {
        Set<VehicleResponseDTO> unavailableVehicles = vehicleService.getUnavailableVehicles();
        if (unavailableVehicles.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(unavailableVehicles);
    }

    @GetMapping(value = "/{vehicleId}")
    public ResponseEntity<VehicleResponseDTO> getVehicleByIdController(@PathVariable(name = "vehicleId") Long vehicleId) {
        try {
            VehicleResponseDTO vehicleResponseDTO = vehicleService.getVehicleById(vehicleId);
            return ResponseEntity.ok().body(vehicleResponseDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping
    public ResponseEntity<VehicleResponseDTO> addVehicleController(@Valid @RequestBody VehiclePersistDTO vehiclePersistDTO) {
        return ResponseEntity.ok().body(vehicleService.addVehicle(vehiclePersistDTO));
    }

    @PostMapping(value = "/{vehicleId}")
    public ResponseEntity<VehicleResponseDTO> updateVehicleByIdController(@PathVariable(name = "vehicleId") Long vehicleId,
                                                                          @Valid @RequestBody VehiclePersistDTO vehiclePersistDTO) {
        return ResponseEntity.ok().body(vehicleService.updateVehicleById(vehicleId, vehiclePersistDTO));
    }
}
