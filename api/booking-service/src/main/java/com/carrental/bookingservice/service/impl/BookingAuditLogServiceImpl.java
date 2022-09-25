package com.carrental.bookingservice.service.impl;

import com.carrental.bookingservice.model.dto.BookingAuditLogResponseDTO;
import com.carrental.bookingservice.repository.BookingAuditLogRepository;
import com.carrental.bookingservice.service.BookingAuditLogService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

public class BookingAuditLogServiceImpl implements BookingAuditLogService {

    private BookingAuditLogRepository bookingAuditLogRepository;

    private ModelMapper modelMapper;

    public BookingAuditLogServiceImpl(BookingAuditLogRepository bookingAuditLogRepository, ModelMapper modelMapper) {
        this.bookingAuditLogRepository = bookingAuditLogRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Set<BookingAuditLogResponseDTO> getBookingsAuditLogs() {
        return bookingAuditLogRepository
                .findAll()
                .stream()
                .map(it -> modelMapper.map(it, BookingAuditLogResponseDTO.class))
                .collect(Collectors.toSet());
    }
}
