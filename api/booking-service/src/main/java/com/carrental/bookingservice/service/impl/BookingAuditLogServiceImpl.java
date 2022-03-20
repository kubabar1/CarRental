package com.carrental.bookingservice.service.impl;

import com.carrental.bookingservice.model.dto.BookingAuditLogResponseDTO;
import com.carrental.bookingservice.repository.BookingAuditLogRepository;
import com.carrental.bookingservice.service.BookingAuditLogService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookingAuditLogServiceImpl implements BookingAuditLogService {

    @Autowired
    private BookingAuditLogRepository bookingAuditLogRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public Set<BookingAuditLogResponseDTO> getBookingsAuditLogs() {
        return bookingAuditLogRepository
                .findAll()
                .stream()
                .map(it -> modelMapper.map(it, BookingAuditLogResponseDTO.class))
                .collect(Collectors.toSet());
    }
}
