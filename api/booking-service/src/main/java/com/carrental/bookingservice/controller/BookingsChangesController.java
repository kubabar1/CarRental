package com.carrental.bookingservice.controller;

import com.carrental.bookingservice.model.dto.BookingChangeResponseDTO;
import com.carrental.bookingservice.service.BookingsChangesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping(value = "/bookings-changes")
public class BookingsChangesController {

    @Autowired
    private BookingsChangesService bookingsChangesService;

    @GetMapping
    public ResponseEntity<Set<BookingChangeResponseDTO>> getBookingChangesController() {
        Set<BookingChangeResponseDTO> bookingChangeResponseDTOS = bookingsChangesService.getBookingChanges();
        if (bookingChangeResponseDTOS.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(bookingChangeResponseDTOS);
    }
}
