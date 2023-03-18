package com.carrental.bookingservice.service;

import com.carrental.bookingservice.exception.BookingStateException;
import com.carrental.bookingservice.model.dto.BookingAddRequestDTO;
import com.carrental.bookingservice.model.dto.BookingCostRequestDTO;
import com.carrental.bookingservice.model.dto.BookingCostResponseDTO;
import com.carrental.bookingservice.model.dto.BookingResponseDTO;
import com.carrental.commons.authentication.exception.AuthorizationException;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.NoSuchElementException;
import java.util.Set;

public interface BookingUserService extends BookingService {

    Page<BookingResponseDTO> getBookings(Pageable pageable) throws AuthorizationException, NoSuchElementException;

    BookingResponseDTO getBookingById(Long bookingId) throws AuthorizationException, NoSuchElementException;

    Page<BookingResponseDTO> getReservedBookings(Pageable pageable) throws AuthorizationException;

    Page<BookingResponseDTO> getRentedBookings(Pageable pageable) throws AuthorizationException;

    BookingResponseDTO cancelBooking(Long bookingId) throws BookingStateException, AuthorizationException;

    BookingCostResponseDTO calculateBookingCost(BookingCostRequestDTO bookingCostRequestDTO);

    BookingResponseDTO addNewBooking(BookingAddRequestDTO bookingAddRequestDTO) throws AuthorizationException, NoSuchElementException;
}
