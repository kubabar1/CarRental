package com.carrental.bookingservice.config;

import com.carrental.bookingservice.config.properties.BookingServiceProperties;
import com.carrental.bookingservice.config.queue.BookingServiceQueueConfig;
import com.carrental.bookingservice.config.security.IgnoreAuthenticationBookingService;
import com.carrental.bookingservice.controller.BookingsAdminController;
import com.carrental.bookingservice.controller.BookingsAuditLogsController;
import com.carrental.bookingservice.controller.BookingsUserController;
import com.carrental.bookingservice.controller.LocationsController;
import com.carrental.bookingservice.listener.BookingListener;
import com.carrental.bookingservice.listener.LocationListener;
import com.carrental.bookingservice.model.entity.BookingAuditLogEntity;
import com.carrental.bookingservice.model.entity.BookingEntity;
import com.carrental.bookingservice.model.entity.LocationEntity;
import com.carrental.bookingservice.repository.BookingAuditLogRepository;
import com.carrental.bookingservice.repository.BookingRepository;
import com.carrental.bookingservice.repository.BookingStateRepository;
import com.carrental.bookingservice.repository.LocationsRepository;
import com.carrental.bookingservice.service.BookingAdminService;
import com.carrental.bookingservice.service.BookingAuditLogService;
import com.carrental.bookingservice.service.BookingUserService;
import com.carrental.bookingservice.service.LocationsService;
import com.carrental.bookingservice.service.impl.filter.BookingFilterOperation;
import com.carrental.bookingservice.service.impl.validator.BookingStateValidator;
import com.carrental.bookingservice.service.impl.BookingAuditLogServiceImpl;
import com.carrental.bookingservice.service.impl.BookingAdminServiceImpl;
import com.carrental.bookingservice.service.impl.LocationsServiceImpl;
import com.carrental.bookingservice.service.impl.BookingUserServiceImpl;
import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import com.carrental.commons.utils.filtering.FilterSpecificationBuilder;
import com.carrental.commons.utils.filtering.specification.operations.impl.DefaultFilterOperations;
import org.modelmapper.ModelMapper;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.boot.autoconfigure.domain.EntityScan;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;

import javax.inject.Inject;

@Import({BookingServiceQueueConfig.class, IgnoreAuthenticationBookingService.class})
@EnableJpaRepositories("com.carrental.bookingservice.repository")
@EntityScan("com.carrental.bookingservice.model.entity")
public class BookingServiceCoreConfig {

    @Bean
    public BookingStateValidator bookingStateValidator() {
        return new BookingStateValidator();
    }

    @Bean
    public BookingServiceProperties bookingServiceProperties() {
        return new BookingServiceProperties();
    }

    @Bean
    public BookingAuditLogService bookingAuditLogService(
            BookingAuditLogRepository bookingAuditLogRepository,
            ModelMapper modelMapper,
            DefaultFilterOperations<BookingAuditLogEntity> bookingAuditLogFilterOperation
    ) {
        return new BookingAuditLogServiceImpl(
                bookingAuditLogRepository,
                modelMapper,
                new FilterSpecificationBuilder<>(bookingAuditLogFilterOperation)
        );
    }

    @Bean
    public BookingFilterOperation<BookingEntity> bookingFilterOperation() {
        return new BookingFilterOperation<>();
    }

    @Bean
    public DefaultFilterOperations<LocationEntity> locationFilterOperation() {
        return new DefaultFilterOperations<>();
    }

    @Bean
    public DefaultFilterOperations<BookingAuditLogEntity> bookingAuditLogFilterOperation() {
        return new DefaultFilterOperations<>();
    }

    @Bean
    public BookingAdminService bookingAdminService(
            BookingRepository bookingRepository,
            BookingStateRepository bookingStateRepository,
            ModelMapper modelMapper,
            BookingStateValidator bookingStateValidator,
            BookingFilterOperation<BookingEntity> bookingFilterOperation
    ) {
        return new BookingAdminServiceImpl(
                bookingRepository,
                bookingStateRepository,
                modelMapper,
                bookingStateValidator,
                new FilterSpecificationBuilder<>(bookingFilterOperation)
        );
    }

    @Bean
    public LocationsService locationsService(
            ModelMapper modelMapper,
            LocationsRepository locationsRepository,
            DefaultFilterOperations<LocationEntity> locationFilterOperation
    ) {
        return new LocationsServiceImpl(modelMapper, locationsRepository, new FilterSpecificationBuilder<>(locationFilterOperation));
    }

    @Bean
    public BookingUserService bookingUserService(
            AuthenticatedUserDataService authenticatedUserDataService,
            BookingRepository bookingRepository,
            ModelMapper modelMapper,
            BookingStateValidator bookingStateValidator,
            BookingStateRepository bookingStateRepository,
            LocationsRepository locationsRepository,
            RabbitTemplate rabbitTemplate,
            DirectExchange rabbitMqExchange,
            BookingServiceProperties bookingServiceProperties,
            BookingFilterOperation<BookingEntity> bookingFilterOperation
    ) {
        return new BookingUserServiceImpl(
                authenticatedUserDataService,
                bookingRepository,
                modelMapper,
                bookingStateValidator,
                bookingStateRepository,
                locationsRepository,
                rabbitTemplate,
                rabbitMqExchange,
                bookingServiceProperties,
                new FilterSpecificationBuilder<>(bookingFilterOperation)
        );
    }

    @Bean
    public LocationsController locationsController(LocationsService locationsService) {
        return new LocationsController(locationsService);
    }

    @Bean
    public BookingsUserController bookingsUserController(BookingUserService bookingUserService) {
        return new BookingsUserController(bookingUserService);
    }

    @Bean
    public BookingsAdminController bookingsAdminController(BookingAdminService bookingAdminService) {
        return new BookingsAdminController(bookingAdminService);
    }

    @Bean
    public BookingsAuditLogsController bookingsAuditLogsController(BookingAuditLogService bookingAuditLogService) {
        return new BookingsAuditLogsController(bookingAuditLogService);
    }

    @Bean
    public LocationListener locationListener(LocationsService locationsService) {
        return new LocationListener(locationsService);
    }

    @Bean
    public BookingListener bookingListener(BookingUserService bookingUserService) {
        return new BookingListener(bookingUserService);
    }
}
