package com.carrental.bookingservice.service.impl;

import com.carrental.bookingservice.model.constants.BookingStateCodeEnum;
import com.carrental.bookingservice.model.dto.BookingResponseDTO;
import com.carrental.bookingservice.model.entity.BookingEntity;
import com.carrental.bookingservice.repository.BookingRepository;
import com.carrental.bookingservice.repository.BookingStateRepository;
import org.modelmapper.ModelMapper;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;

import java.util.List;
import java.util.stream.Collectors;

public class BookingServiceCommons {

    private final BookingRepository bookingRepository;

    private final ModelMapper modelMapper;

    public BookingServiceCommons(BookingRepository bookingRepository, ModelMapper modelMapper) {
        this.bookingRepository = bookingRepository;
        this.modelMapper = modelMapper;
    }

    protected Page<BookingResponseDTO> getAllBookings(Specification<BookingEntity> spec, Pageable pageable) {
        Page<BookingEntity> bookingEntities = bookingRepository.findAll(spec, pageable);
        List<BookingResponseDTO> bookingResponseDTOList = bookingEntities
                .getContent()
                .stream()
                .map(bookingEntity -> modelMapper.map(bookingEntity, BookingResponseDTO.class))
                .collect(Collectors.toList());
        return new PageImpl<>(bookingResponseDTOList, pageable, bookingEntities.getTotalElements());
    }

    protected Specification<BookingEntity> getBookingStateSpecification(BookingStateCodeEnum bookingStateCode) {
        return (root, query, criteriaBuilder) ->
                criteriaBuilder.equal(root.get("bookingStateCode").get("bookingCode"), bookingStateCode);
    }
}
