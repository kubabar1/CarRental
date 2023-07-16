package com.carrental.bookingservice.service;

import com.carrental.bookingservice.exception.BookingStateException;
import com.carrental.bookingservice.model.dto.*;
import com.carrental.commons.authentication.exception.AuthorizationException;

import java.util.NoSuchElementException;
import java.util.Set;

public interface BookingUserService extends BookingService {

    BookingCostResponseDTO calculateBookingCost(BookingCostRequestDTO bookingCostRequestDTO);

    BookingResponseDTO addNewBooking(BookingAddRequestDTO bookingAddRequestDTO) throws AuthorizationException, NoSuchElementException, BookingStateException;

    Set<BookingStateDTO> getBookingStates();

    Set<Long> getBookedVehiclesIds(AvailableVehiclesSearchDTO availableVehiclesSearchDTO);
}
