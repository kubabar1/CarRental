package com.carrental.vehicleservice.controller;

import com.carrental.vehicleservice.model.dto.VehicleFilterParamsDTO;
import com.carrental.vehicleservice.model.dto.VehiclePersistDTO;
import com.carrental.vehicleservice.model.dto.VehicleResponseDTO;
import com.carrental.vehicleservice.service.FilteringService;
import com.carrental.vehicleservice.service.VehicleService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Set;

@CrossOrigin
@RequestMapping(value = "/vehicles")
public class VehicleController {

    private final VehicleService vehicleService;

    private final FilteringService filteringService;

    public VehicleController(VehicleService vehicleService, FilteringService filteringService) {
        this.vehicleService = vehicleService;
        this.filteringService = filteringService;
    }

    @GetMapping
    public ResponseEntity<Page<VehicleResponseDTO>> getVehiclesController(Pageable pageable) {
        return ResponseEntity.ok().body(vehicleService.getVehicles(pageable));
    }

    @GetMapping(value = "/best-offers")
    public ResponseEntity<Page<VehicleResponseDTO>> getBestOffersVehiclesController(Pageable pageable) {
        return ResponseEntity.ok().body(vehicleService.getBestOffersVehicles(pageable));
    }

    @GetMapping(value = "/available")
    public ResponseEntity<Set<VehicleResponseDTO>> getAvailableVehiclesController() {
        return ResponseEntity.ok().body(vehicleService.getAvailableVehicles());
    }

    @GetMapping(value = "/unavailable")
    public ResponseEntity<Page<VehicleResponseDTO>> getUnavailableVehiclesController(Pageable pageable) {
        return ResponseEntity.ok().body(vehicleService.getUnavailableVehicles(pageable));
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
    public ResponseEntity<Page<VehicleResponseDTO>> getVehiclesByFilter(@RequestParam Map<String, String> filtersMap, Pageable pageable) {
        try {
            return ResponseEntity.ok().body(filteringService.filterVehicles(filtersMap, pageable));
        } catch (NumberFormatException exception) {
            return ResponseEntity.badRequest().build();
        }
    }
}
