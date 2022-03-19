package com.carrental.bookingservice.service;

import com.carrental.bookingservice.exception.BookingStateException;
import com.carrental.bookingservice.model.dto.BookingResponseDTO;

import java.util.NoSuchElementException;

public interface BookingAdminService extends BookingService {

    BookingResponseDTO rentBooking(Long bookingId) throws NoSuchElementException, BookingStateException;

    BookingResponseDTO returnBooking(Long bookingId) throws NoSuchElementException, BookingStateException;
}
