package com.carrental.bookingservice.service.impl;

import com.carrental.bookingservice.model.dto.LocationResponseDTO;
import com.carrental.bookingservice.repository.LocationsRepository;
import com.carrental.bookingservice.service.LocationsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

public class LocationsServiceImpl implements LocationsService {

    private LocationsRepository locationsRepository;

    private ModelMapper modelMapper;

    public LocationsServiceImpl(ModelMapper modelMapper, LocationsRepository locationsRepository) {
        this.modelMapper = modelMapper;
        this.locationsRepository = locationsRepository;
    }

    @Override
    public Set<LocationResponseDTO> getLocations() {
        return locationsRepository
                .findAll()
                .stream()
                .map(locationEntity -> modelMapper.map(locationEntity, LocationResponseDTO.class))
                .collect(Collectors.toSet());
    }
}
