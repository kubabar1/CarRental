package com.carrental.bookingservice.controller;

import com.carrental.bookingservice.exception.BookingStateException;
import com.carrental.bookingservice.model.dto.BookingResponseDTO;
import com.carrental.bookingservice.service.BookingUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.NoSuchElementException;
import java.util.Set;

@CrossOrigin
@RequestMapping(value = "/user/bookings")
public class BookingsUserController implements BookingsController {

    private BookingUserService bookingUserService;

    public BookingsUserController(BookingUserService bookingUserService) {
        this.bookingUserService = bookingUserService;
    }

    @Override
    public ResponseEntity<Set<BookingResponseDTO>> getBookingsController() {
        Set<BookingResponseDTO> bookingResponseDTOSet = bookingUserService.getBookings();
        if (bookingResponseDTOSet.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(bookingResponseDTOSet);
    }

    @Override
    public ResponseEntity<BookingResponseDTO> getBookingByIdController(Long bookingId) {
        try {
            BookingResponseDTO bookingResponseDTO = bookingUserService.getBookingById(bookingId);
            return ResponseEntity.ok().body(bookingResponseDTO);
        } catch (NoSuchElementException e) {
            return ResponseEntity.notFound().build();
        }
    }

    @Override
    public ResponseEntity<Set<BookingResponseDTO>> getReservedBookingsController() {
        Set<BookingResponseDTO> bookingResponseDTOSet = bookingUserService.getReservedBookings();
        if (bookingResponseDTOSet.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(bookingResponseDTOSet);
    }

    @Override
    public ResponseEntity<Set<BookingResponseDTO>> getRentedBookingsController() {
        Set<BookingResponseDTO> bookingResponseDTOSet = bookingUserService.getRentedBookings();
        if (bookingResponseDTOSet.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(bookingResponseDTOSet);
    }

    @Override
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
