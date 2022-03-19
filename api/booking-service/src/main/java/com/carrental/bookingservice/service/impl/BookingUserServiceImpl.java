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
import com.carrental.commons.authentication.model.AuthenticatedUserData;
import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookingUserServiceImpl implements BookingUserService {

    @Autowired
    private AuthenticatedUserDataService authenticatedUserDataService;

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BookingStateValidator bookingStateValidator;

    @Autowired
    private BookingStateRepository bookingStateRepository;


    @Override
    public Set<BookingResponseDTO> getBookings() throws AuthorizationException, NoSuchElementException {
        AuthenticatedUserData authenticatedUserData = authenticatedUserDataService.getAuthenticatedUserData();
        return bookingRepository
                .findAllByUserId(authenticatedUserData.getId())
                .orElseThrow()
                .stream()
                .map(booking -> modelMapper.map(booking, BookingResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public BookingResponseDTO getBookingById(Long bookingId) throws AuthorizationException, NoSuchElementException {
        AuthenticatedUserData authenticatedUserData = authenticatedUserDataService.getAuthenticatedUserData();
        return modelMapper.map(bookingRepository
                .findByIdAndUserId(bookingId, authenticatedUserData.getId())
                .orElseThrow(), BookingResponseDTO.class);
    }

    @Override
    public Set<BookingResponseDTO> getReservedBookings() throws AuthorizationException {
        AuthenticatedUserData authenticatedUserData = authenticatedUserDataService.getAuthenticatedUserData();
        return bookingRepository
                .findAllReservedByUserId(authenticatedUserData.getId())
                .stream()
                .map(booking -> modelMapper.map(booking, BookingResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public Set<BookingResponseDTO> getRentedBookings() throws AuthorizationException {
        AuthenticatedUserData authenticatedUserData = authenticatedUserDataService.getAuthenticatedUserData();
        return bookingRepository
                .findAllRentedByUserId(authenticatedUserData.getId())
                .stream()
                .map(booking -> modelMapper.map(booking, BookingResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public BookingResponseDTO cancelBooking(Long bookingId) throws BookingStateException, AuthorizationException {
        AuthenticatedUserData authenticatedUserData = authenticatedUserDataService.getAuthenticatedUserData();
        BookingEntity bookingEntity = bookingRepository.findByIdAndUserId(bookingId, authenticatedUserData.getId()).orElseThrow();
        bookingStateValidator.validateBookingStateDuringUpdate(bookingEntity, BookingStateCodeEnum.CAN);
        BookingStateEntity cancelBookingStateEntity = bookingStateRepository
                .findById(BookingStateCodeEnum.CAN)
                .orElseThrow(InternalError::new);
        bookingEntity.setBookingStateCode(cancelBookingStateEntity);
        return modelMapper.map(bookingRepository.save(bookingEntity), BookingResponseDTO.class);
    }
}
