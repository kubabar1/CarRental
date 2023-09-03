package com.carrental.bookingservice.service.impl;

import com.carrental.bookingservice.config.properties.BookingServiceProperties;
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
import com.carrental.bookingservice.service.impl.validator.BookingStateValidator;
import com.carrental.commons.amqp.utils.RabbitMqUtil;
import com.carrental.commons.authentication.exception.AuthorizationException;
import com.carrental.commons.authentication.model.AuthenticatedUser;
import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import com.carrental.commons.utils.filtering.FilterSpecificationBuilder;
import org.apache.commons.collections4.IteratorUtils;
import org.modelmapper.ModelMapper;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.math.BigDecimal;
import java.time.Duration;
import java.time.LocalDate;
import java.time.ZoneId;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

public class BookingUserServiceImpl extends BookingServiceCommons implements BookingUserService {

    private final AuthenticatedUserDataService authenticatedUserDataService;

    private final BookingRepository bookingRepository;

    private final ModelMapper modelMapper;

    private final BookingStateValidator bookingStateValidator;

    private final BookingStateRepository bookingStateRepository;

    private final LocationsRepository locationsRepository;

    private final RabbitTemplate rabbitTemplate;

    private final DirectExchange rabbitMqExchange;

    private final BookingServiceProperties bookingServiceProperties;

    private final FilterSpecificationBuilder<BookingEntity> filterSpecificationBuilder;

    public BookingUserServiceImpl(
            AuthenticatedUserDataService authenticatedUserDataService,
            BookingRepository bookingRepository,
            ModelMapper modelMapper,
            BookingStateValidator bookingStateValidator,
            BookingStateRepository bookingStateRepository,
            LocationsRepository locationsRepository,
            RabbitTemplate rabbitTemplate,
            DirectExchange rabbitMqExchange,
            BookingServiceProperties bookingServiceProperties,
            FilterSpecificationBuilder<BookingEntity> filterSpecificationBuilder
    ) {
        super(bookingRepository, modelMapper);
        this.authenticatedUserDataService = authenticatedUserDataService;
        this.bookingRepository = bookingRepository;
        this.modelMapper = modelMapper;
        this.bookingStateValidator = bookingStateValidator;
        this.bookingStateRepository = bookingStateRepository;
        this.locationsRepository = locationsRepository;
        this.rabbitTemplate = rabbitTemplate;
        this.rabbitMqExchange = rabbitMqExchange;
        this.bookingServiceProperties = bookingServiceProperties;
        this.filterSpecificationBuilder = filterSpecificationBuilder;
    }

    @Override
    public BookingResponseDTO addNewBooking(BookingAddRequestDTO bookingAddRequestDTO) throws AuthorizationException, NoSuchElementException, BookingStateException {
        if (isVehicleBooked(bookingAddRequestDTO.getVehicleId(), bookingAddRequestDTO.getReceiptDate(), bookingAddRequestDTO.getReturnDate())) {
            throw new BookingStateException("Vehicle is already booked");
        }

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
    public Page<BookingResponseDTO> getBookings(Pageable pageable, String filterString) throws AuthorizationException, NoSuchElementException {
        Specification<BookingEntity> spec = filterSpecificationBuilder.build(filterString);
        Specification<BookingEntity> userIdSpec = getUserIdSpec();
        return getAllBookings(spec == null ? userIdSpec : spec.and(userIdSpec), pageable);
    }

    @Override
    public BookingResponseDTO getBookingById(Long bookingId) throws AuthorizationException, NoSuchElementException {
        AuthenticatedUser authenticatedUser = authenticatedUserDataService.getAuthenticatedUserData();
        return modelMapper.map(bookingRepository
                .findByIdAndUserId(bookingId, authenticatedUser.getUserId())
                .orElseThrow(), BookingResponseDTO.class);
    }

    @Override
    public Page<BookingResponseDTO> getReservedBookings(Pageable pageable, String filterString) throws AuthorizationException {
        Specification<BookingEntity> spec = filterSpecificationBuilder.build(filterString);
        Specification<BookingEntity> reservationSpec = getBookingStateSpecification(BookingStateCodeEnum.RES)
                .and(getUserIdSpec());
        return getAllBookings(spec == null ? reservationSpec : spec.and(reservationSpec), pageable);
    }

    @Override
    public Page<BookingResponseDTO> getRentedBookings(Pageable pageable, String filterString) throws AuthorizationException {
        Specification<BookingEntity> spec = filterSpecificationBuilder.build(filterString);
        Specification<BookingEntity> rentedSpec = getBookingStateSpecification(BookingStateCodeEnum.REN)
                .and(getUserIdSpec());
        return getAllBookings(spec == null ? rentedSpec : spec.and(rentedSpec), pageable);
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

    @Override
    public Set<BookingStateDTO> getBookingStates() {
        return IteratorUtils.toList(bookingStateRepository.findAll().iterator())
                .stream()
                .map(bookingState -> modelMapper.map(bookingState, BookingStateDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public Set<Long> getBookedVehiclesIds(AvailableVehiclesSearchDTO availableVehiclesSearchDTO) {
        Specification<BookingEntity> bookedVehiclesSpec = getBookedVehiclesSpec(
            availableVehiclesSearchDTO.getReceiptDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate(),
            availableVehiclesSearchDTO.getReturnDate().toInstant().atZone(ZoneId.systemDefault()).toLocalDate()
        );

        return bookingRepository.findAll(bookedVehiclesSpec)
            .stream()
            .map(BookingEntity::getVehicleId)
            .collect(Collectors.toSet());
    }

    private boolean isVehicleBooked(Long vehicleId, LocalDate receiptDate, LocalDate returnDate) {
        Specification<BookingEntity> bookedVehiclesSpec = getBookedVehiclesSpec(receiptDate, returnDate).and(getVehicleIdSpec(vehicleId));
        bookingRepository.findAll(bookedVehiclesSpec);
        return bookingRepository.findAll(bookedVehiclesSpec).size() > 0;
    }

    private Specification<BookingEntity> getBookedVehiclesSpec(LocalDate receiptDate, LocalDate returnDate) {
        Specification<BookingEntity> reservedOrRentedBookingsSpec = getBookedVehiclesStateSpec();
        Specification<BookingEntity> availableVehiclesSearchSpec = getBookedVehiclesDateSpec(receiptDate, returnDate);
        return availableVehiclesSearchSpec.and(reservedOrRentedBookingsSpec);
    }

    private Specification<BookingEntity> getBookedVehiclesStateSpec() {
        Specification<BookingEntity> reservedSpec = (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("bookingStateCode").get("bookingCode"), BookingStateCodeEnum.RES);
        Specification<BookingEntity> rentedSpec = (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("bookingStateCode").get("bookingCode"), BookingStateCodeEnum.REN);
        return reservedSpec.or(rentedSpec);
    }

    private Specification<BookingEntity> getBookedVehiclesDateSpec(LocalDate receiptDate, LocalDate returnDate) {
        Specification<BookingEntity> receiptDateBetweenSpec = (root, query, criteriaBuilder) ->
                criteriaBuilder.between(root.get("receiptDate"), receiptDate, returnDate);
        Specification<BookingEntity> returnDateBetweenSpec = (root, query, criteriaBuilder) ->
                criteriaBuilder.between(root.get("returnDate"), receiptDate, returnDate);
        Specification<BookingEntity> receiptDateBelowSpec = (root, query, criteriaBuilder) ->
                criteriaBuilder.lessThanOrEqualTo(root.get("receiptDate"), receiptDate);
        Specification<BookingEntity> returnDateAboveSpec = (root, query, criteriaBuilder) ->
                criteriaBuilder.greaterThanOrEqualTo(root.get("returnDate"), returnDate);

        return receiptDateBetweenSpec.or(returnDateBetweenSpec).or(receiptDateBelowSpec.and(returnDateAboveSpec));
    }

    private Specification<BookingEntity> getVehicleIdSpec(Long vehicleId) {
        return (root, query, criteriaBuilder) -> criteriaBuilder.equal(root.get("vehicleId"), vehicleId);
    }

    private Specification<BookingEntity> getUserIdSpec() {
        return (root, query, criteriaBuilder) ->
            criteriaBuilder.equal(root.get("userId"), authenticatedUserDataService.getAuthenticatedUserData().getUserId());
    }

    public VehicleResponseDTO getVehicleById(Long vehicleId) {
        return rabbitTemplate.convertSendAndReceiveAsType(rabbitMqExchange.getName(), bookingServiceProperties.getGetVehicleByIdQueue(), vehicleId, new ParameterizedTypeReference<>() {});
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
        long duration = Duration.between(reservationDate.atStartOfDay(), returnDate.atStartOfDay()).toDays();
        if (duration < 1) {
            throw new IllegalArgumentException("Duration between return and reservation date cannot be below 1 day");
        }
        return duration;
    }
}
