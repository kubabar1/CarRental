package com.carrental.vehicleservice.config;

import com.carrental.commons.utils.filtering.FilterSpecificationBuilder;
import com.carrental.commons.utils.filtering.specification.operations.impl.DefaultFilterOperations;
import com.carrental.vehicleservice.controller.EquipmentController;
import com.carrental.vehicleservice.controller.VehicleController;
import com.carrental.vehicleservice.model.entity.EquipmentEntity;
import com.carrental.vehicleservice.model.entity.VehicleEntity;
import com.carrental.vehicleservice.repository.*;
import com.carrental.vehicleservice.service.EquipmentService;
import com.carrental.vehicleservice.service.FilteringService;
import com.carrental.vehicleservice.service.VehicleRatingService;
import com.carrental.vehicleservice.service.VehicleService;
import com.carrental.vehicleservice.service.impl.EquipmentServiceImpl;
import com.carrental.vehicleservice.service.impl.FilteringServiceImpl;
import com.carrental.vehicleservice.service.impl.VehicleRatingServiceImpl;
import com.carrental.vehicleservice.service.impl.VehicleServiceImpl;
import com.carrental.vehicleservice.listener.VehicleListener;
import org.modelmapper.ModelMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;

import javax.persistence.EntityManager;


@Import({VehicleServiceQueueConfig.class})
public class VehicleServiceCoreConfig {

    @Bean
    public DefaultFilterOperations<EquipmentEntity> equipmentFilterOperations() {
        return new DefaultFilterOperations<>();
    }

    @Bean
    public DefaultFilterOperations<VehicleEntity> vehicleFilterOperations() {
        return new DefaultFilterOperations<>();
    }

    @Bean
    public EquipmentService equipmentService(
            EquipmentRepository equipmentRepository,
            VehicleRepository vehicleRepository,
            ModelMapper modelMapper,
            RabbitTemplate rabbitTemplate,
            DefaultFilterOperations<EquipmentEntity> equipmentFilterOperations
    ) {
        return new EquipmentServiceImpl(
                equipmentRepository,
                vehicleRepository,
                modelMapper,
                rabbitTemplate,
                new FilterSpecificationBuilder<>(equipmentFilterOperations)
        );
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
            ModelMapper modelMapper,
            VehicleRatingService vehicleRatingService,
            RabbitTemplate rabbitTemplate,
            DefaultFilterOperations<VehicleEntity> vehicleFilterOperations
    ) {
        return new VehicleServiceImpl(
                vehicleRepository,
                colorRepository,
                bodyTypeRepository,
                fuelTypeRepository,
                brandRepository,
                modelRepository,
                modelMapper,
                vehicleRatingService,
                rabbitTemplate,
                new FilterSpecificationBuilder<>(vehicleFilterOperations)
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

    @Bean
    public VehicleListener vehicleListener(VehicleService vehicleService) {
        return new VehicleListener(vehicleService);
    }
}
