package com.carrental.bookingservice.service;

import com.carrental.bookingservice.exception.BookingStateException;
import com.carrental.bookingservice.model.dto.BookingResponseDTO;
import com.carrental.commons.authentication.exception.AuthorizationException;

import java.util.NoSuchElementException;
import java.util.Set;

public interface BookingUserService extends BookingService {

    Set<BookingResponseDTO> getBookings() throws AuthorizationException, NoSuchElementException;

    BookingResponseDTO getBookingById(Long bookingId) throws AuthorizationException, NoSuchElementException;

    Set<BookingResponseDTO> getReservedBookings() throws AuthorizationException;

    Set<BookingResponseDTO> getRentedBookings() throws AuthorizationException;

    BookingResponseDTO cancelBooking(Long bookingId) throws BookingStateException, AuthorizationException;
}
