package com.carrental.bookingservice.service;

import com.carrental.bookingservice.exception.BookingStateException;
import com.carrental.bookingservice.model.dto.BookingResponseDTO;

import java.util.NoSuchElementException;
import java.util.Set;

public interface BookingService {

  Set<BookingResponseDTO> getBookings();

  BookingResponseDTO getBookingById(Long bookingId) throws NoSuchElementException;

  Set<BookingResponseDTO> getReservedBookings();

  Set<BookingResponseDTO> getRentedBookings();

  BookingResponseDTO cancelBooking(Long bookingId) throws NoSuchElementException, BookingStateException;
}
