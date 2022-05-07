package com.carrental.ratingservice.controller;

import com.carrental.ratingservice.model.dto.AverageRateResponseDTO;
import com.carrental.ratingservice.model.dto.RateAddDTO;
import com.carrental.ratingservice.model.dto.RateResponseDTO;
import com.carrental.ratingservice.service.RateService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.util.NoSuchElementException;

@CrossOrigin
@RestController
@RequestMapping("/rates")
public class RateController {

    @Autowired
    private RateService rateService;


    @GetMapping(value = "/{vehicleId}")
    public ResponseEntity<AverageRateResponseDTO> getAverageRateController(@PathVariable(value = "vehicleId") Long vehicleId) {
        AverageRateResponseDTO averageRateForVehicle;
        try {
            averageRateForVehicle = rateService.getAverageRateForVehicle(vehicleId);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok().body(averageRateForVehicle);
    }


    @PutMapping
    public ResponseEntity<RateResponseDTO> addRateController(@Valid @RequestBody RateAddDTO rateAddDTO) {
        return ResponseEntity.ok().body(rateService.addRate(rateAddDTO));
    }
}
