package com.carrental.bookingservice.config;

import com.carrental.bookingservice.controller.BookingsAdminController;
import com.carrental.bookingservice.controller.BookingsAuditLogsController;
import com.carrental.bookingservice.controller.BookingsUserController;
import com.carrental.bookingservice.controller.LocationsController;
import com.carrental.bookingservice.repository.BookingAuditLogRepository;
import com.carrental.bookingservice.repository.BookingRepository;
import com.carrental.bookingservice.repository.BookingStateRepository;
import com.carrental.bookingservice.repository.LocationsRepository;
import com.carrental.bookingservice.service.BookingAdminService;
import com.carrental.bookingservice.service.BookingAuditLogService;
import com.carrental.bookingservice.service.BookingUserService;
import com.carrental.bookingservice.service.LocationsService;
import com.carrental.bookingservice.service.impl.BookingStateValidator;
import com.carrental.bookingservice.service.impl.BookingAuditLogServiceImpl;
import com.carrental.bookingservice.service.impl.BookingAdminServiceImpl;
import com.carrental.bookingservice.service.impl.LocationsServiceImpl;
import com.carrental.bookingservice.service.impl.BookingUserServiceImpl;
import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import org.modelmapper.ModelMapper;
import org.springframework.context.annotation.Bean;

public class BookingServiceCoreConfig {

    @Bean
    public BookingStateValidator bookingStateValidator() {
        return new BookingStateValidator();
    }

    @Bean
    public BookingAuditLogService bookingAuditLogService(
            BookingAuditLogRepository bookingAuditLogRepository,
            ModelMapper modelMapper
    ) {
        return new BookingAuditLogServiceImpl(bookingAuditLogRepository, modelMapper);
    }

    @Bean
    public BookingAdminService bookingAdminService(
            BookingRepository bookingRepository,
            BookingStateRepository bookingStateRepository,
            ModelMapper modelMapper,
            BookingStateValidator bookingStateValidator
    ) {
        return new BookingAdminServiceImpl(
                bookingRepository,
                bookingStateRepository,
                modelMapper,
                bookingStateValidator
        );
    }

    @Bean
    public LocationsService locationsService(ModelMapper modelMapper, LocationsRepository locationsRepository) {
        return new LocationsServiceImpl(modelMapper, locationsRepository);
    }

    @Bean
    public BookingUserService bookingUserService(
            AuthenticatedUserDataService authenticatedUserDataService,
            BookingRepository bookingRepository,
            ModelMapper modelMapper,
            BookingStateValidator bookingStateValidator,
            BookingStateRepository bookingStateRepository
    ) {
        return new BookingUserServiceImpl(
                authenticatedUserDataService,
                bookingRepository,
                modelMapper,
                bookingStateValidator,
                bookingStateRepository
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
}
