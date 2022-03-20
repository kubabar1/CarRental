package com.carrental.bookingservice.service;

import com.carrental.bookingservice.model.dto.BookingAuditLogResponseDTO;

import java.util.Set;

public interface BookingAuditLogService {

    Set<BookingAuditLogResponseDTO> getBookingsAuditLogs();
}
