package com.carrental.vehicleservice.service;

import com.carrental.vehicleservice.model.dto.VehicleResponseDTO;

import java.util.List;

public interface VehicleRatingService {

    void setVehiclesAverageRating(List<VehicleResponseDTO> vehicles);
}
