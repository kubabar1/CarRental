package com.carrental.bookingservice.controller;

import com.carrental.bookingservice.model.dto.BookingResponseDTO;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RequestMapping(value = "/bookings")
public interface BookingsController {

    @GetMapping
    ResponseEntity<Set<BookingResponseDTO>> getBookingsController();

    @GetMapping(value = "/{bookingId}")
    ResponseEntity<BookingResponseDTO> getBookingByIdController(@PathVariable(name = "bookingId") Long bookingId);

    @GetMapping(value = "/reserved")
    ResponseEntity<Set<BookingResponseDTO>> getReservedBookingsController();

    @GetMapping(value = "/rented")
    ResponseEntity<Set<BookingResponseDTO>> getRentedBookingsController();

    @PostMapping(value = "/cancel/{bookingId}")
    ResponseEntity<BookingResponseDTO> cancelBookingController(@PathVariable(name = "bookingId") Long bookingId);
}
