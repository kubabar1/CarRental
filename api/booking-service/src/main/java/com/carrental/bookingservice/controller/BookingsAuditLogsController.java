package com.carrental.bookingservice.controller;

import com.carrental.bookingservice.model.dto.BookingAuditLogResponseDTO;
import com.carrental.bookingservice.service.BookingAuditLogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.Set;

@RequestMapping(value = "/bookings-audit-logs")
public class BookingsAuditLogsController {

    private final BookingAuditLogService bookingAuditLogService;

    public BookingsAuditLogsController(BookingAuditLogService bookingAuditLogService) {
        this.bookingAuditLogService = bookingAuditLogService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ROLE_ADMIN')")
    public ResponseEntity<Page<BookingAuditLogResponseDTO>> getBookingsAuditLogsController(
            Pageable pageable,
            @RequestParam(value = "filter", required = false) String filterString
    ) {
        return ResponseEntity.ok().body(bookingAuditLogService.getBookingsAuditLogs(pageable, filterString));
    }
}
