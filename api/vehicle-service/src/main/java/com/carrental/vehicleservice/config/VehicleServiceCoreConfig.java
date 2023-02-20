package com.carrental.vehicleservice.config;

import com.carrental.vehicleservice.controller.EquipmentController;
import com.carrental.vehicleservice.controller.VehicleController;
import com.carrental.vehicleservice.repository.*;
import com.carrental.vehicleservice.service.EquipmentService;
import com.carrental.vehicleservice.service.FilteringService;
import com.carrental.vehicleservice.service.VehicleRatingService;
import com.carrental.vehicleservice.service.VehicleService;
import com.carrental.vehicleservice.service.impl.EquipmentServiceImpl;
import com.carrental.vehicleservice.service.impl.FilteringServiceImpl;
import com.carrental.vehicleservice.service.impl.VehicleRatingServiceImpl;
import com.carrental.vehicleservice.service.impl.VehicleServiceImpl;
import org.modelmapper.ModelMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
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
    public VehicleRatingService vehicleRatingService(RabbitTemplate rabbitTemplate) {
        return new VehicleRatingServiceImpl(rabbitTemplate);
    }

    @Bean
    public FilteringService filteringService(
            EntityManager entityManager,
            ModelMapper modelMapper,
            VehicleRepository vehicleRepository,
            VehicleRatingService vehicleRatingService
    ) {
        return new FilteringServiceImpl(entityManager, modelMapper, vehicleRepository, vehicleRatingService);
    }

    @Bean
    public VehicleService vehicleService(
            VehicleRepository vehicleRepository,
            ColorRepository colorRepository,
            BodyTypeRepository bodyTypeRepository,
            FuelTypeRepository fuelTypeRepository,
            BrandRepository brandRepository,
            ModelRepository modelRepository,
            VehicleStatusRepository vehicleStatusRepository,
            ModelMapper modelMapper,
            VehicleRatingService vehicleRatingService,
            RabbitTemplate rabbitTemplate
    ) {
        return new VehicleServiceImpl(
                vehicleRepository,
                colorRepository,
                bodyTypeRepository,
                fuelTypeRepository,
                brandRepository,
                modelRepository,
                vehicleStatusRepository,
                modelMapper,
                vehicleRatingService,
                rabbitTemplate
        );
    }

    @Bean
    public VehicleController vehicleController(
            VehicleService vehicleService,
            FilteringService filteringService
    ) {
        return new VehicleController(vehicleService, filteringService);
    }

    @Bean
    public EquipmentController equipmentController(EquipmentService equipmentService) {
        return new EquipmentController(equipmentService);
    }
}
