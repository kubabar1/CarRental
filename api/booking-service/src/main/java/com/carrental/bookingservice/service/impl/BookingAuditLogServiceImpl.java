package com.carrental.bookingservice.service.impl;

import com.carrental.bookingservice.model.dto.BookingAuditLogResponseDTO;
import com.carrental.bookingservice.model.entity.BookingAuditLogEntity;
import com.carrental.bookingservice.repository.BookingAuditLogRepository;
import com.carrental.bookingservice.service.BookingAuditLogService;
import com.carrental.commons.utils.filtering.FilterSpecificationBuilder;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.stream.Collectors;

public class BookingAuditLogServiceImpl implements BookingAuditLogService {

    private final BookingAuditLogRepository bookingAuditLogRepository;

    private final ModelMapper modelMapper;

    private final FilterSpecificationBuilder<BookingAuditLogEntity> filterSpecificationBuilder;

    public BookingAuditLogServiceImpl(
            BookingAuditLogRepository bookingAuditLogRepository,
            ModelMapper modelMapper,
            FilterSpecificationBuilder<BookingAuditLogEntity> filterSpecificationBuilder
    ) {
        this.bookingAuditLogRepository = bookingAuditLogRepository;
        this.modelMapper = modelMapper;
        this.filterSpecificationBuilder = filterSpecificationBuilder;
    }

    @Override
    public Page<BookingAuditLogResponseDTO> getBookingsAuditLogs(Pageable pageable, String filterString) {
        Specification<BookingAuditLogEntity> spec = filterSpecificationBuilder.build(filterString);
        Page<BookingAuditLogEntity> bookingAuditLogEntities = bookingAuditLogRepository.findAll(spec, pageable);
        List<BookingAuditLogResponseDTO> bookingAuditLogResponseDTOList = bookingAuditLogEntities
                .getContent()
                .stream()
                .map(it -> modelMapper.map(it, BookingAuditLogResponseDTO.class))
                .collect(Collectors.toList());
        return new PageImpl<>(bookingAuditLogResponseDTOList, pageable, bookingAuditLogEntities.getTotalElements());
    }
}
