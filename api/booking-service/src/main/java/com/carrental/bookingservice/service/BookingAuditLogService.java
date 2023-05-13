package com.carrental.bookingservice.service;

import com.carrental.bookingservice.model.dto.BookingAuditLogResponseDTO;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.Set;

public interface BookingAuditLogService {

    Page<BookingAuditLogResponseDTO> getBookingsAuditLogs(Pageable pageable, String filterString);
}
