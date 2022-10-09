package com.carrental.bookingservice.service.impl;

import com.carrental.bookingservice.model.dto.BookingAuditLogResponseDTO;
import com.carrental.bookingservice.model.entity.BookingAuditLogEntity;
import com.carrental.bookingservice.repository.BookingAuditLogRepository;
import com.carrental.bookingservice.service.BookingAuditLogService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Set;
import java.util.stream.Collectors;

public class BookingAuditLogServiceImpl implements BookingAuditLogService {

    private final BookingAuditLogRepository bookingAuditLogRepository;

    private final ModelMapper modelMapper;

    public BookingAuditLogServiceImpl(BookingAuditLogRepository bookingAuditLogRepository, ModelMapper modelMapper) {
        this.bookingAuditLogRepository = bookingAuditLogRepository;
        this.modelMapper = modelMapper;
    }

    @Override
    public Page<BookingAuditLogResponseDTO> getBookingsAuditLogs(Pageable pageable) {
        Page<BookingAuditLogEntity> bookingAuditLogEntities = bookingAuditLogRepository.findAll(pageable);
        List<BookingAuditLogResponseDTO> bookingAuditLogResponseDTOList = bookingAuditLogEntities
                .getContent()
                .stream()
                .map(it -> modelMapper.map(it, BookingAuditLogResponseDTO.class))
                .collect(Collectors.toList());
        return new PageImpl<>(bookingAuditLogResponseDTOList, pageable, bookingAuditLogEntities.getTotalElements());
    }
}
