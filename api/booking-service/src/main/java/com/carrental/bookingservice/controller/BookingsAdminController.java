package com.carrental.bookingservice.controller;

import com.carrental.bookingservice.exception.BookingStateException;
import com.carrental.bookingservice.model.dto.BookingResponseDTO;
import com.carrental.bookingservice.service.BookingAdminService;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.NoSuchElementException;

@RequestMapping(value = "/admin/bookings")
public class BookingsAdminController implements BookingsController {

    private final BookingAdminService bookingAdminService;

    public BookingsAdminController(BookingAdminService bookingAdminService) {
        this.bookingAdminService = bookingAdminService;
    }

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<BookingResponseDTO>> getBookingsController(Pageable pageable) {
        return ResponseEntity.ok().body(bookingAdminService.getBookings(pageable));
    }

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BookingResponseDTO> getBookingByIdController(Long bookingId) {
        try {
            BookingResponseDTO bookingResponseDTO = bookingAdminService.getBookingById(bookingId);
            return ResponseEntity.ok().body(bookingResponseDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<BookingResponseDTO>> getReservedBookingsController(Pageable pageable) {
        return ResponseEntity.ok().body(bookingAdminService.getReservedBookings(pageable));
    }

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<BookingResponseDTO>> getRentedBookingsController(Pageable pageable) {
        return ResponseEntity.ok().body(bookingAdminService.getRentedBookings(pageable));
    }

    @Override
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BookingResponseDTO> cancelBookingController(Long bookingId) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(bookingAdminService.cancelBooking(bookingId));
        } catch (NoSuchElementException exception) {
            return ResponseEntity.notFound().build();
        } catch (BookingStateException exception) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/rent/{bookingId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BookingResponseDTO> rentBookingController(@PathVariable(name = "bookingId") Long bookingId) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(bookingAdminService.rentBooking(bookingId));
        } catch (NoSuchElementException exception) {
            return ResponseEntity.notFound().build();
        } catch (BookingStateException exception) {
            return ResponseEntity.badRequest().build();
        }
    }

    @PostMapping(value = "/return/{bookingId}")
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<BookingResponseDTO> returnBookingController(@PathVariable(name = "bookingId") Long bookingId) {
        try {
            return ResponseEntity.status(HttpStatus.OK).body(bookingAdminService.returnBooking(bookingId));
        } catch (NoSuchElementException exception) {
            return ResponseEntity.notFound().build();
        } catch (BookingStateException exception) {
            return ResponseEntity.badRequest().build();
        }
    }
}
