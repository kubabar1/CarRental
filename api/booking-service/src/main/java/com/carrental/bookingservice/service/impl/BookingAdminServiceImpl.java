package com.carrental.bookingservice.service.impl;

import com.carrental.bookingservice.exception.BookingStateException;
import com.carrental.bookingservice.model.constants.BookingStateCodeEnum;
import com.carrental.bookingservice.model.dto.BookingResponseDTO;
import com.carrental.bookingservice.model.dto.BookingStateDTO;
import com.carrental.bookingservice.model.entity.BookingEntity;
import com.carrental.bookingservice.model.entity.BookingStateEntity;
import com.carrental.bookingservice.repository.BookingRepository;
import com.carrental.bookingservice.repository.BookingStateRepository;
import com.carrental.bookingservice.service.BookingAdminService;
import com.carrental.bookingservice.service.impl.validator.BookingStateValidator;
import com.carrental.commons.utils.filtering.FilterSpecificationBuilder;
import org.apache.commons.collections4.IteratorUtils;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.*;
import java.util.stream.Collectors;

public class BookingAdminServiceImpl extends BookingServiceCommons implements BookingAdminService {

    private final BookingRepository bookingRepository;

    private final BookingStateRepository bookingStateRepository;

    private final ModelMapper modelMapper;

    private final BookingStateValidator bookingStateValidator;

    private final FilterSpecificationBuilder<BookingEntity> filterSpecificationBuilder;

    public BookingAdminServiceImpl(
            BookingRepository bookingRepository,
            BookingStateRepository bookingStateRepository,
            ModelMapper modelMapper,
            BookingStateValidator bookingStateValidator,
            FilterSpecificationBuilder<BookingEntity> filterSpecificationBuilder
    ) {
        super(bookingRepository, modelMapper);
        this.bookingRepository = bookingRepository;
        this.bookingStateRepository = bookingStateRepository;
        this.modelMapper = modelMapper;
        this.bookingStateValidator = bookingStateValidator;
        this.filterSpecificationBuilder = filterSpecificationBuilder;
    }

    @Override
    public Page<BookingResponseDTO> getBookings(Pageable pageable, String filterString) {
        return getAllBookings(filterSpecificationBuilder.build(filterString), pageable);
    }

    @Override
    public BookingResponseDTO getBookingById(Long bookingId) throws NoSuchElementException {
        return modelMapper.map(bookingRepository.findById(bookingId).orElseThrow(), BookingResponseDTO.class);
    }

    @Override
    public Page<BookingResponseDTO> getReservedBookings(Pageable pageable, String filterString) {
        Specification<BookingEntity> spec = filterSpecificationBuilder.build(filterString);
        Specification<BookingEntity> reservedSpec = (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("bookingStateCode").get("bookingCode"), BookingStateCodeEnum.RES);
        return getAllBookings(spec == null ? reservedSpec : spec.and(reservedSpec), pageable);
    }

    @Override
    public Page<BookingResponseDTO> getRentedBookings(Pageable pageable, String filterString) {
        Specification<BookingEntity> spec = filterSpecificationBuilder.build(filterString);
        Specification<BookingEntity> rentedSpec = (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("bookingStateCode").get("bookingCode"), BookingStateCodeEnum.REN);
        return getAllBookings(spec == null ? rentedSpec : spec.and(rentedSpec), pageable);
    }

    @Override
    public BookingResponseDTO cancelBooking(Long bookingId) throws NoSuchElementException, BookingStateException {
        return updateBookingStatus(bookingId, BookingStateCodeEnum.CAN);
    }

    @Override
    public BookingResponseDTO rentBooking(Long bookingId) throws NoSuchElementException, BookingStateException {
        return updateBookingStatus(bookingId, BookingStateCodeEnum.REN);
    }

    @Override
    public BookingResponseDTO returnBooking(Long bookingId) throws NoSuchElementException, BookingStateException {
        return updateBookingStatus(bookingId, BookingStateCodeEnum.RET);
    }

    @Override
    public Set<BookingStateDTO> getBookingStates() {
        return IteratorUtils.toList(bookingStateRepository.findAll().iterator())
                .stream()
                .map(bookingState -> modelMapper.map(bookingState, BookingStateDTO.class))
                .collect(Collectors.toSet());
    }



    private BookingResponseDTO updateBookingStatus(Long bookingId, BookingStateCodeEnum newBookingState) throws NoSuchElementException, BookingStateException {
        BookingEntity bookingEntity = bookingRepository.findById(bookingId).orElseThrow();
        bookingStateValidator.validateBookingStateDuringUpdate(bookingEntity, newBookingState);
        BookingStateEntity newBookingStateEntity = bookingStateRepository
                .findById(newBookingState)
                .orElseThrow(InternalError::new);
        bookingEntity.setBookingStateCode(newBookingStateEntity);
        return modelMapper.map(bookingRepository.save(bookingEntity), BookingResponseDTO.class);
    }
}
