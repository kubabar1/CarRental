package com.carrental.bookingservice.service;

import com.carrental.bookingservice.model.dto.BookingChangeResponseDTO;

import java.util.Set;

public interface BookingsChangesService {

    Set<BookingChangeResponseDTO> getBookingChanges();
}
