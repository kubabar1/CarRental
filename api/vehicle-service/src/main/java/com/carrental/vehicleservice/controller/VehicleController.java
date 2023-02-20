package com.carrental.vehicleservice.controller;

import com.carrental.vehicleservice.model.dto.*;
import com.carrental.vehicleservice.service.FilteringService;
import com.carrental.vehicleservice.service.VehicleService;
import io.swagger.v3.oas.annotations.media.Content;
import io.swagger.v3.oas.annotations.media.Encoding;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.FieldError;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.Map;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@CrossOrigin
@RequestMapping(value = "/vehicles")
public class VehicleController {

    private final VehicleService vehicleService;

    private final FilteringService filteringService;
    public VehicleController(
            VehicleService vehicleService,
            FilteringService filteringService
    ) {
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

    @GetMapping(value = "/unavailable")
    @PreAuthorize("isAuthenticated()")
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

    @PutMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_RENTING_EMPLOYEE')")
    public ResponseEntity<VehicleResponseDTO> addVehicleController(
            @Valid @RequestPart(value = "vehiclePersistDTO") VehiclePersistDTO vehiclePersistDTO,
            @RequestPart(value = "vehicleImage") MultipartFile vehicleImage
    ) {
        try {
            return ResponseEntity.ok().body(vehicleService.addVehicle(vehiclePersistDTO, vehicleImage));
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PutMapping(value = "/brand")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_RENTING_EMPLOYEE')")
    public ResponseEntity<OptionDTO> addBrandController(@Valid @RequestBody OptionDTO optionDTO) {
        return ResponseEntity.ok().body(vehicleService.addBrand(optionDTO));
    }

    @PutMapping(value = "/body-type")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_RENTING_EMPLOYEE')")
    public ResponseEntity<OptionDTO> addBodyTypeController(@Valid @RequestBody OptionDTO optionDTO) {
        return ResponseEntity.ok().body(vehicleService.addBodyType(optionDTO));
    }

    @PutMapping(value = "/fuel-type")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_RENTING_EMPLOYEE')")
    public ResponseEntity<OptionDTO> addFuelTypeController(@Valid @RequestBody OptionDTO optionDTO) {
        return ResponseEntity.ok().body(vehicleService.addFuelType(optionDTO));
    }

    @PutMapping(value = "/color")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_RENTING_EMPLOYEE')")
    public ResponseEntity<OptionDTO> addColorController(@Valid @RequestBody OptionDTO optionDTO) {
        return ResponseEntity.ok().body(vehicleService.addColor(optionDTO));
    }

    @PutMapping(value = "/model")
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_RENTING_EMPLOYEE')")
    public ResponseEntity<VehicleModelDTO> addVehicleModelController(@Valid @RequestBody VehicleModelDTO vehicleModelDTO) {
        return ResponseEntity.ok().body(vehicleService.addVehicleModel(vehicleModelDTO));
    }

    @PostMapping(value = "/{vehicleId}", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    @PreAuthorize("hasRole('ROLE_ADMIN') || hasRole('ROLE_RENTING_EMPLOYEE')")
    public ResponseEntity<VehicleResponseDTO> updateVehicleByIdController(
            @PathVariable(name = "vehicleId") Long vehicleId,
            @Valid @RequestPart(value = "vehiclePersistDTO") VehiclePersistDTO vehiclePersistDTO,
            @RequestPart(value = "vehicleImage", required = false) MultipartFile vehicleImage
    ) {
        try {
            return ResponseEntity.ok().body(vehicleService.updateVehicleById(vehicleId, vehiclePersistDTO, vehicleImage));
        } catch (IOException e) {
            return ResponseEntity.badRequest().build();
        }
    }

    @GetMapping(value = "/options")
    public ResponseEntity<VehicleOptionsDTO> getVehiclesOptionsController() {
        return ResponseEntity.ok().body(vehicleService.getVehiclesOptions());
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

    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(MethodArgumentNotValidException.class)
    public ResponseEntity<Map<String, String>> handleValidationExceptions(MethodArgumentNotValidException ex) {
        Map<String, String> errors = ex.getBindingResult().getAllErrors().stream()
                .collect(Collectors.toMap(
                        e -> e instanceof FieldError ? ((FieldError) e).getField() : "",
                        e -> e.getDefaultMessage() == null ? "" : e.getDefaultMessage())
                );
        return ResponseEntity.badRequest().body(errors);
    }
}
