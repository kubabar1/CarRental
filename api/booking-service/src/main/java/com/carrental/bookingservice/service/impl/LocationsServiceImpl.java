package com.carrental.bookingservice.service.impl;

import com.carrental.bookingservice.model.dto.LocationAddDTO;
import com.carrental.bookingservice.model.dto.LocationResponseDTO;
import com.carrental.bookingservice.model.entity.LocationEntity;
import com.carrental.bookingservice.repository.LocationsRepository;
import com.carrental.bookingservice.service.LocationsService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class LocationsServiceImpl implements LocationsService {

    private final LocationsRepository locationsRepository;

    private final ModelMapper modelMapper;

    public LocationsServiceImpl(ModelMapper modelMapper, LocationsRepository locationsRepository) {
        this.modelMapper = modelMapper;
        this.locationsRepository = locationsRepository;
    }

    @Override
    public Page<LocationResponseDTO> getLocations(Pageable pageable) {
        Page<LocationEntity> locationEntities = locationsRepository.findAll(pageable);
        List<LocationResponseDTO> locationResponseDTOS = locationEntities
                .getContent()
                .stream()
                .map(locationEntity -> modelMapper.map(locationEntity, LocationResponseDTO.class))
                .collect(Collectors.toList());
        return new PageImpl<>(locationResponseDTOS, pageable, locationEntities.getTotalElements());
    }

    @Override
    public Set<LocationResponseDTO> getAllLocations(String country) {
        if (country != null && !country.isEmpty()) {
            return locationsRepository.findAllByCountry(country)
                    .stream()
                    .map(locationEntity -> modelMapper.map(locationEntity, LocationResponseDTO.class))
                    .collect(Collectors.toSet());
        } else {
            return locationsRepository.findAll()
                    .stream()
                    .map(locationEntity -> modelMapper.map(locationEntity, LocationResponseDTO.class))
                    .collect(Collectors.toSet());
        }
    }

    @Override
    public LocationResponseDTO addLocation(LocationAddDTO locationAddDTO) {
        LocationEntity locationEntity = new LocationEntity();
        locationEntity.setCountry(locationAddDTO.getCountry());
        locationEntity.setCity(locationAddDTO.getCity());
        locationEntity.setStreetAndNb(locationAddDTO.getStreetAndNb());
        locationEntity.setCode(locationAddDTO.getCode());
        locationEntity.setEmail(locationAddDTO.getEmail());
        locationEntity.setPhone(locationAddDTO.getPhone());
        LocationEntity createdLocation  = locationsRepository.save(modelMapper.map(locationAddDTO, LocationEntity.class));
        return modelMapper.map(createdLocation, LocationResponseDTO.class);
    }
}
