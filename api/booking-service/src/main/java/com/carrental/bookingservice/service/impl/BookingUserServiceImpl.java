package com.carrental.bookingservice.service.impl;

import com.carrental.bookingservice.exception.BookingStateException;
import com.carrental.bookingservice.model.constants.BookingStateCodeEnum;
import com.carrental.bookingservice.model.dto.*;
import com.carrental.bookingservice.model.entity.BookingEntity;
import com.carrental.bookingservice.model.entity.BookingStateEntity;
import com.carrental.bookingservice.model.entity.LocationEntity;
import com.carrental.bookingservice.repository.BookingRepository;
import com.carrental.bookingservice.repository.BookingStateRepository;
import com.carrental.bookingservice.repository.LocationsRepository;
import com.carrental.bookingservice.service.BookingUserService;
import com.carrental.commons.authentication.exception.AuthorizationException;
import com.carrental.commons.authentication.model.AuthenticatedUser;
import com.carrental.commons.authentication.model.AuthenticatedUserDTO;
import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import org.modelmapper.ModelMapper;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDate;
import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

public class BookingUserServiceImpl implements BookingUserService {

    private final AuthenticatedUserDataService authenticatedUserDataService;

    private final BookingRepository bookingRepository;

    private final ModelMapper modelMapper;

    private final BookingStateValidator bookingStateValidator;

    private final BookingStateRepository bookingStateRepository;

    private final LocationsRepository locationsRepository;

    private final RabbitTemplate rabbitTemplate;

    public BookingUserServiceImpl(
            AuthenticatedUserDataService authenticatedUserDataService,
            BookingRepository bookingRepository,
            ModelMapper modelMapper,
            BookingStateValidator bookingStateValidator,
            BookingStateRepository bookingStateRepository,
            LocationsRepository locationsRepository,
            RabbitTemplate rabbitTemplate
    ) {
        this.authenticatedUserDataService = authenticatedUserDataService;
        this.bookingRepository = bookingRepository;
        this.modelMapper = modelMapper;
        this.bookingStateValidator = bookingStateValidator;
        this.bookingStateRepository = bookingStateRepository;
        this.locationsRepository = locationsRepository;
        this.rabbitTemplate = rabbitTemplate;
    }

    @Override
    public BookingResponseDTO addNewBooking(BookingAddRequestDTO bookingAddRequestDTO) throws AuthorizationException, NoSuchElementException {
        AuthenticatedUser authenticatedUser = authenticatedUserDataService.getAuthenticatedUserData();
        VehicleResponseDTO vehicleResponseDTO = getVehicleById(bookingAddRequestDTO.getVehicleId());

        BookingStateEntity reservedBookingStateEntity = bookingStateRepository
            .findById(BookingStateCodeEnum.RES)
            .orElseThrow(InternalError::new);

        LocationEntity bookingLocation = locationsRepository
            .findById(bookingAddRequestDTO.getLocationId())
            .orElseThrow(NoSuchElementException::new);

        BigDecimal totalCost = calculateReservationCost(
            bookingAddRequestDTO.getReceiptDate(),
            bookingAddRequestDTO.getReturnDate(),
            vehicleResponseDTO.getDailyFee()
        );

        BookingEntity bookingEntity = new BookingEntity();
        bookingEntity.setBookingStateCode(reservedBookingStateEntity);
        bookingEntity.setLocation(bookingLocation);
        bookingEntity.setReceiptDate(bookingAddRequestDTO.getReceiptDate());
        bookingEntity.setReturnDate(bookingAddRequestDTO.getReturnDate());
        bookingEntity.setUserId(authenticatedUser.getUserId());
        bookingEntity.setVehicleId(bookingAddRequestDTO.getVehicleId());
        bookingEntity.setTotalCost(totalCost);

        return modelMapper.map(bookingRepository.save(bookingEntity), BookingResponseDTO.class);
    }

    @Override
    public Page<BookingResponseDTO> getBookings(Pageable pageable) throws AuthorizationException, NoSuchElementException {
        AuthenticatedUser authenticatedUser = authenticatedUserDataService.getAuthenticatedUserData();
        Page<BookingEntity> bookingEntities = bookingRepository.findAllByUserId(authenticatedUser.getUserId(), pageable).orElseThrow();
        List<BookingResponseDTO> bookingResponseDTOS = bookingEntities
                .getContent()
                .stream()
                .map(booking -> modelMapper.map(booking, BookingResponseDTO.class))
                .collect(Collectors.toList());
        return new PageImpl<>(bookingResponseDTOS, pageable, bookingEntities.getTotalElements());
    }

    @Override
    public BookingResponseDTO getBookingById(Long bookingId) throws AuthorizationException, NoSuchElementException {
        AuthenticatedUser authenticatedUser = authenticatedUserDataService.getAuthenticatedUserData();
        return modelMapper.map(bookingRepository
                .findByIdAndUserId(bookingId, authenticatedUser.getUserId())
                .orElseThrow(), BookingResponseDTO.class);
    }

    @Override
    public Page<BookingResponseDTO> getReservedBookings(Pageable pageable) throws AuthorizationException {
        AuthenticatedUser authenticatedUser = authenticatedUserDataService.getAuthenticatedUserData();
        Page<BookingEntity> bookingEntities = bookingRepository.findAllReservedByUserId(authenticatedUser.getUserId(), pageable);
        List<BookingResponseDTO> bookingResponseDTOList = bookingEntities
                .getContent()
                .stream()
                .map(booking -> modelMapper.map(booking, BookingResponseDTO.class))
                .collect(Collectors.toList());
        return new PageImpl<>(bookingResponseDTOList, pageable, bookingEntities.getTotalElements());
    }

    @Override
    public Page<BookingResponseDTO> getRentedBookings(Pageable pageable) throws AuthorizationException {
        AuthenticatedUser authenticatedUser = authenticatedUserDataService.getAuthenticatedUserData();
        Page<BookingEntity> bookingEntities = bookingRepository.findAllRentedByUserId(authenticatedUser.getUserId(), pageable);
        List<BookingResponseDTO> bookingResponseDTOList = bookingEntities
                .getContent()
                .stream()
                .map(booking -> modelMapper.map(booking, BookingResponseDTO.class))
                .collect(Collectors.toList());
        return new PageImpl<>(bookingResponseDTOList, pageable, bookingEntities.getTotalElements());
    }

    @Override
    public BookingResponseDTO cancelBooking(Long bookingId) throws BookingStateException, AuthorizationException {
        AuthenticatedUser authenticatedUser = authenticatedUserDataService.getAuthenticatedUserData();
        BookingEntity bookingEntity = bookingRepository.findByIdAndUserId(bookingId, authenticatedUser.getUserId()).orElseThrow();
        bookingStateValidator.validateBookingStateDuringUpdate(bookingEntity, BookingStateCodeEnum.CAN);
        BookingStateEntity cancelBookingStateEntity = bookingStateRepository
                .findById(BookingStateCodeEnum.CAN)
                .orElseThrow(InternalError::new);
        bookingEntity.setBookingStateCode(cancelBookingStateEntity);
        return modelMapper.map(bookingRepository.save(bookingEntity), BookingResponseDTO.class);
    }

    @Override
    public BookingCostResponseDTO calculateBookingCost(BookingCostRequestDTO bookingCostRequestDTO) {
        BookingCostResponseDTO bookingCostResponseDTO = new BookingCostResponseDTO();
        VehicleResponseDTO vehicleResponseDTO = getVehicleById(bookingCostRequestDTO.getVehicleId());
        BigDecimal totalCost = calculateReservationCost(
            bookingCostRequestDTO.getReservationDate(),
            bookingCostRequestDTO.getReturnDate(),
            vehicleResponseDTO.getDailyFee()
        );
        bookingCostResponseDTO.setTotalCost(totalCost);
        return bookingCostResponseDTO;
    }

    public VehicleResponseDTO getVehicleById(Long vehicleId) {
        return rabbitTemplate.convertSendAndReceiveAsType(
                "getVehicleByIdQueue",
                vehicleId,
                new ParameterizedTypeReference<>() {
                }
        );
    }

    public BigDecimal calculateReservationCost(
        LocalDate reservationDate,
        LocalDate returnDate,
        BigDecimal dailyFee
    ) throws IllegalArgumentException {
        long duration = reservationDuration(reservationDate, returnDate);
        return dailyFee.multiply(BigDecimal.valueOf(duration));
    }

    public long reservationDuration(LocalDate reservationDate, LocalDate returnDate) throws IllegalArgumentException {
        long duration = Duration.between(reservationDate.atStartOfDay(), returnDate.atStartOfDay()).toDays(); // TODO: FIX
        if (duration < 1) {
            throw new IllegalArgumentException("Duration between return and reservation date cannot be below 1 day");
        }
        return duration;
    }
}
