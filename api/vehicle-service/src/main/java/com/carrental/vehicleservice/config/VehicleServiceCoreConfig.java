package com.carrental.vehicleservice.config;

import com.carrental.vehicleservice.controller.EquipmentController;
import com.carrental.vehicleservice.controller.VehicleController;
import com.carrental.vehicleservice.repository.EquipmentRepository;
import com.carrental.vehicleservice.repository.VehicleRepository;
import com.carrental.vehicleservice.service.EquipmentService;
import com.carrental.vehicleservice.service.FilteringService;
import com.carrental.vehicleservice.service.VehicleService;
import com.carrental.vehicleservice.service.impl.EquipmentServiceImpl;
import com.carrental.vehicleservice.service.impl.FilteringServiceImpl;
import com.carrental.vehicleservice.service.impl.VehicleServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;

import javax.persistence.EntityManager;


public class VehicleServiceCoreConfig {

    @Bean
    public EquipmentService equipmentService(
            EquipmentRepository equipmentRepository,
            VehicleRepository vehicleRepository,
            ModelMapper modelMapper
    ) {
        return new EquipmentServiceImpl(equipmentRepository, vehicleRepository, modelMapper);
    }

    @Bean
    public FilteringService filteringService(
            EntityManager entityManager,
            ModelMapper modelMapper,
            VehicleRepository vehicleRepository
    ) {
        return new FilteringServiceImpl(entityManager, modelMapper, vehicleRepository);
    }

    @Bean
    public VehicleService vehicleService(VehicleRepository vehicleRepository, ModelMapper modelMapper) {
        return new VehicleServiceImpl(vehicleRepository, modelMapper);
    }

    @Bean
    public VehicleController vehicleController(VehicleService vehicleService, FilteringService filteringService) {
        return new VehicleController(vehicleService, filteringService);
    }

    @Bean
    public EquipmentController equipmentController(EquipmentService equipmentService) {
        return new EquipmentController(equipmentService);
    }
}
