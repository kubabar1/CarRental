package com.carrental.bookingservice.service;

import com.carrental.bookingservice.exception.BookingStateException;
import com.carrental.bookingservice.model.dto.AvailableVehiclesSearchDTO;
import com.carrental.bookingservice.model.dto.BookingResponseDTO;
import com.carrental.bookingservice.model.dto.LocationResponseDTO;
import com.carrental.commons.authentication.exception.AuthorizationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.NoSuchElementException;
import java.util.Set;

public interface BookingService {

    Page<BookingResponseDTO> getBookings(Pageable pageable, String filter) throws AuthorizationException, NoSuchElementException;

    BookingResponseDTO getBookingById(Long bookingId) throws AuthorizationException, NoSuchElementException;

    Page<BookingResponseDTO> getReservedBookings(Pageable pageable, String filterString) throws AuthorizationException;

    Page<BookingResponseDTO> getRentedBookings(Pageable pageable, String filterString) throws AuthorizationException;

    BookingResponseDTO cancelBooking(Long bookingId) throws NoSuchElementException, BookingStateException;
}
