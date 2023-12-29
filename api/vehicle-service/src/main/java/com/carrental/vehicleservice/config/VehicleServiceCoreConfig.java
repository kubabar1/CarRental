package com.carrental.vehicleservice.config;

import com.carrental.commons.utils.filtering.FilterSpecificationBuilder;
import com.carrental.commons.utils.filtering.specification.operations.impl.DefaultFilterOperations;
import com.carrental.vehicleservice.config.properties.VehicleServiceProperties;
import com.carrental.vehicleservice.config.queue.VehicleServiceQueueConfig;
import com.carrental.vehicleservice.config.security.IgnoreAuthenticationVehicleService;
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
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.*;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.persistence.EntityManager;

@EnableJpaRepositories("com.carrental.vehicleservice.repository")
@EntityScan("com.carrental.vehicleservice.model.entity")
@ComponentScan(basePackages = { "com.carrental.vehicleservice.*" })
@Import({VehicleServiceQueueConfig.class, IgnoreAuthenticationVehicleService.class})
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
            VehicleServiceProperties vehicleServiceProperties,
            DefaultFilterOperations<EquipmentEntity> equipmentFilterOperations
    ) {
        return new EquipmentServiceImpl(
                equipmentRepository,
                vehicleRepository,
                modelMapper,
                rabbitTemplate,
                vehicleServiceProperties,
                new FilterSpecificationBuilder<>(equipmentFilterOperations)
        );
    }

    @Bean
    public VehicleRatingService vehicleRatingService(RabbitTemplate rabbitTemplate, VehicleServiceProperties vehicleServiceProperties) {
        return new VehicleRatingServiceImpl(rabbitTemplate, vehicleServiceProperties);
    }

    @Bean
    public VehicleServiceProperties vehicleServiceProperties() {
        return new VehicleServiceProperties();
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
            DirectExchange rabbitMqExchange,
            VehicleServiceProperties vehicleServiceProperties,
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
                rabbitMqExchange,
                vehicleServiceProperties,
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
