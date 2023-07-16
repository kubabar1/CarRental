package com.carrental.bookingservice.service;

import com.carrental.bookingservice.exception.BookingStateException;
import com.carrental.bookingservice.model.dto.BookingResponseDTO;
import com.carrental.bookingservice.model.dto.BookingStateDTO;
import com.carrental.bookingservice.model.entity.BookingStateEntity;

import java.util.NoSuchElementException;
import java.util.Set;

public interface BookingAdminService extends BookingService {

    BookingResponseDTO rentBooking(Long bookingId) throws NoSuchElementException, BookingStateException;

    BookingResponseDTO returnBooking(Long bookingId) throws NoSuchElementException, BookingStateException;
}
