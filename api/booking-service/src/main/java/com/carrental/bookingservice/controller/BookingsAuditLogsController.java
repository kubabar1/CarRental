package com.carrental.bookingservice.controller;

import com.carrental.bookingservice.model.dto.BookingAuditLogResponseDTO;
import com.carrental.bookingservice.service.BookingAuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@CrossOrigin
@RestController
@RequestMapping(value = "/bookings-audit-logs")
public class BookingsAuditLogsController {

    @Autowired
    private BookingAuditLogService bookingAuditLogService;

    @GetMapping
    public ResponseEntity<Set<BookingAuditLogResponseDTO>> getBookingsAuditLogsController() {
        Set<BookingAuditLogResponseDTO> bookingAuditLogResponseDTOS = bookingAuditLogService.getBookingsAuditLogs();
        bookingAuditLogResponseDTOS.forEach(System.out::println);
        if (bookingAuditLogResponseDTOS.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok().body(bookingAuditLogResponseDTOS);
    }
}
