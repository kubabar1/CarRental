package com.carrental.bookingservice.controller;

import com.carrental.bookingservice.model.dto.BookingAuditLogResponseDTO;
import com.carrental.bookingservice.service.BookingAuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Set;

@CrossOrigin
@RequestMapping(value = "/bookings-audit-logs")
public class BookingsAuditLogsController {

    private final BookingAuditLogService bookingAuditLogService;

    public BookingsAuditLogsController(BookingAuditLogService bookingAuditLogService) {
        this.bookingAuditLogService = bookingAuditLogService;
    }

    @GetMapping
    public ResponseEntity<Page<BookingAuditLogResponseDTO>> getBookingsAuditLogsController(Pageable pageable) {
        return ResponseEntity.ok().body(bookingAuditLogService.getBookingsAuditLogs(pageable));
    }
}
