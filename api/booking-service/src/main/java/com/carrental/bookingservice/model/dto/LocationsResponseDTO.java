package com.carrental.bookingservice.model.dto;

import lombok.Data;

import java.util.Set;

@Data
public class LocationsResponseDTO {

    Set<LocationResponseDTO> locations;

    public LocationsResponseDTO() {
    }

    public LocationsResponseDTO(Set<LocationResponseDTO> locations) {
        this.locations = locations;
    }
}
