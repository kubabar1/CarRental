package com.carrental.vehicleservice.controller;

import com.carrental.vehicleservice.model.constants.FilteringParamsEnum;
import com.carrental.vehicleservice.model.dto.VehicleFilterParamsDTO;
import com.carrental.vehicleservice.model.dto.VehiclePersistDTO;
import com.carrental.vehicleservice.model.dto.VehicleResponseDTO;
import com.carrental.vehicleservice.service.FilteringService;
import com.carrental.vehicleservice.service.VehicleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.*;

@CrossOrigin
@RestController
@RequestMapping(value = "/vehicles")
public class VehicleController {

    @Autowired
    private VehicleService vehicleService;

    @Autowired
    private FilteringService filteringService;


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

    @GetMapping(value = "/filter-params")
    public ResponseEntity<VehicleFilterParamsDTO> getVehiclesFilterParamsController() {
        return ResponseEntity.ok().body(vehicleService.getVehiclesFilterParams());
    }

    @GetMapping(value = "/filter-params/brand-models/{brand}")
    public ResponseEntity<Set<String>> getVehicleModelsByBrand(@PathVariable(name = "brand") String brand) {
        return ResponseEntity.ok().body(vehicleService.getVehicleModelsByBrand(brand));
    }

    @GetMapping(value = "/filter")
    public ResponseEntity<List<VehicleResponseDTO>> getVehiclesByFilter(@RequestParam Map<String, String> filtersMap) {
        try {
            return ResponseEntity.ok().body(filteringService.filterVehicles(filtersMap));
        } catch (NumberFormatException exception) {
            return ResponseEntity.badRequest().build();
        }
    }
}
