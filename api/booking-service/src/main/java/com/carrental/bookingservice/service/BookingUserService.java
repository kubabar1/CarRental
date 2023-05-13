package com.carrental.bookingservice.service;

import com.carrental.bookingservice.model.dto.BookingAddRequestDTO;
import com.carrental.bookingservice.model.dto.BookingCostRequestDTO;
import com.carrental.bookingservice.model.dto.BookingCostResponseDTO;
import com.carrental.bookingservice.model.dto.BookingResponseDTO;
import com.carrental.commons.authentication.exception.AuthorizationException;

import java.util.NoSuchElementException;

public interface BookingUserService extends BookingService {

    BookingCostResponseDTO calculateBookingCost(BookingCostRequestDTO bookingCostRequestDTO);

    BookingResponseDTO addNewBooking(BookingAddRequestDTO bookingAddRequestDTO) throws AuthorizationException, NoSuchElementException;
}
