package com.carrental.bookingservice.controller;

import com.carrental.bookingservice.exception.BookingStateException;
import com.carrental.bookingservice.model.dto.BookingResponseDTO;
import com.carrental.bookingservice.service.BookingUserService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.RequestMapping;

import java.util.NoSuchElementException;

@RequestMapping(value = "/user/bookings")
public class BookingsUserController implements BookingsController {

    private final BookingUserService bookingUserService;

    public BookingsUserController(BookingUserService bookingUserService) {
        this.bookingUserService = bookingUserService;
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<BookingResponseDTO>> getBookingsController(Pageable pageable) {
        return ResponseEntity.ok().body(bookingUserService.getBookings(pageable));
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<BookingResponseDTO> getBookingByIdController(Long bookingId) {
        try {
            BookingResponseDTO bookingResponseDTO = bookingUserService.getBookingById(bookingId);
            return ResponseEntity.ok().body(bookingResponseDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<BookingResponseDTO>> getReservedBookingsController(Pageable pageable) {
        return ResponseEntity.ok().body(bookingUserService.getReservedBookings(pageable));
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<Page<BookingResponseDTO>> getRentedBookingsController(Pageable pageable) {
        return ResponseEntity.ok().body(bookingUserService.getRentedBookings(pageable));
    }

    @Override
    @PreAuthorize("isAuthenticated()")
    public ResponseEntity<BookingResponseDTO> cancelBookingController(Long bookingId) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(bookingUserService.cancelBooking(bookingId));
        } catch (NoSuchElementException exception) {
            return ResponseEntity.notFound().build();
        } catch (BookingStateException exception) {
            return ResponseEntity.badRequest().build();
        }
    }
}
