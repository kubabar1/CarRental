package com.carrental.bookingservice.controller;

import com.carrental.bookingservice.model.dto.BookingResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping(value = "/bookings")
public interface BookingsController {

    @GetMapping
    ResponseEntity<Page<BookingResponseDTO>> getBookingsController(Pageable pageable, String filter);

    @GetMapping(value = "/{bookingId}")
    ResponseEntity<BookingResponseDTO> getBookingByIdController(@PathVariable(name = "bookingId") Long bookingId);

    @GetMapping(value = "/reserved")
    ResponseEntity<Page<BookingResponseDTO>> getReservedBookingsController(Pageable pageable, String filterString);

    @GetMapping(value = "/rented")
    ResponseEntity<Page<BookingResponseDTO>> getRentedBookingsController(Pageable pageable, String filterString);

    @PostMapping(value = "/cancel/{bookingId}")
    ResponseEntity<BookingResponseDTO> cancelBookingController(@PathVariable(name = "bookingId") Long bookingId);
}
