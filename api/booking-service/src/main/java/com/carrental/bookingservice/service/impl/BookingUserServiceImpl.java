package com.carrental.bookingservice.service.impl;

import com.carrental.bookingservice.exception.BookingStateException;
import com.carrental.bookingservice.model.constants.BookingStateCodeEnum;
import com.carrental.bookingservice.model.dto.BookingResponseDTO;
import com.carrental.bookingservice.model.entity.BookingEntity;
import com.carrental.bookingservice.model.entity.BookingStateEntity;
import com.carrental.bookingservice.repository.BookingRepository;
import com.carrental.bookingservice.repository.BookingStateRepository;
import com.carrental.bookingservice.service.BookingUserService;
import com.carrental.commons.authentication.exception.AuthorizationException;
import com.carrental.commons.authentication.model.AuthenticatedUser;
import com.carrental.commons.authentication.model.AuthenticatedUserDTO;
import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.stream.Collectors;

public class BookingUserServiceImpl implements BookingUserService {

    private final AuthenticatedUserDataService authenticatedUserDataService;

    private final BookingRepository bookingRepository;

    private final ModelMapper modelMapper;

    private final BookingStateValidator bookingStateValidator;

    private final BookingStateRepository bookingStateRepository;

    public BookingUserServiceImpl(
            AuthenticatedUserDataService authenticatedUserDataService,
            BookingRepository bookingRepository,
            ModelMapper modelMapper,
            BookingStateValidator bookingStateValidator,
            BookingStateRepository bookingStateRepository
    ) {
        this.authenticatedUserDataService = authenticatedUserDataService;
        this.bookingRepository = bookingRepository;
        this.modelMapper = modelMapper;
        this.bookingStateValidator = bookingStateValidator;
        this.bookingStateRepository = bookingStateRepository;
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
}
