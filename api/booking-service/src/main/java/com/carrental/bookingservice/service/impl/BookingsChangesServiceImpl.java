package com.carrental.bookingservice.service.impl;

import com.carrental.bookingservice.model.dto.BookingChangeResponseDTO;
import com.carrental.bookingservice.repository.BookingChangeRepository;
import com.carrental.bookingservice.service.BookingsChangesService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookingsChangesServiceImpl implements BookingsChangesService {

    @Autowired
    private BookingChangeRepository bookingChangeRepository;

    @Autowired
    private ModelMapper modelMapper;


    @Override
    public Set<BookingChangeResponseDTO> getBookingChanges() {
        return bookingChangeRepository
                .findAll()
                .stream()
                .map(it -> modelMapper.map(it, BookingChangeResponseDTO.class))
                .collect(Collectors.toSet());
    }
}
