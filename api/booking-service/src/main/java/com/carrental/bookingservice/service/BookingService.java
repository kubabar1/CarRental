package com.carrental.bookingservice.service;

import com.carrental.bookingservice.exception.BookingStateException;
import com.carrental.bookingservice.model.dto.BookingResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.NoSuchElementException;
import java.util.Set;

public interface BookingService {

  Page<BookingResponseDTO> getBookings(Pageable pageable);

  BookingResponseDTO getBookingById(Long bookingId) throws NoSuchElementException;

  Page<BookingResponseDTO> getReservedBookings(Pageable pageable);

  Page<BookingResponseDTO> getRentedBookings(Pageable pageable);

  BookingResponseDTO cancelBooking(Long bookingId) throws NoSuchElementException, BookingStateException;
}
