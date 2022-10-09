package com.carrental.bookingservice.service.impl;

import com.carrental.bookingservice.exception.BookingStateException;
import com.carrental.bookingservice.model.constants.BookingStateCodeEnum;
import com.carrental.bookingservice.model.dto.BookingResponseDTO;
import com.carrental.bookingservice.model.entity.BookingEntity;
import com.carrental.bookingservice.model.entity.BookingStateEntity;
import com.carrental.bookingservice.repository.BookingRepository;
import com.carrental.bookingservice.repository.BookingStateRepository;
import com.carrental.bookingservice.service.BookingAdminService;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

public class BookingAdminServiceImpl implements BookingAdminService {

    private final BookingRepository bookingRepository;

    private final BookingStateRepository bookingStateRepository;

    private final ModelMapper modelMapper;

    private final BookingStateValidator bookingStateValidator;

    public BookingAdminServiceImpl(
            BookingRepository bookingRepository,
            BookingStateRepository bookingStateRepository,
            ModelMapper modelMapper,
            BookingStateValidator bookingStateValidator
    ) {
        this.bookingRepository = bookingRepository;
        this.bookingStateRepository = bookingStateRepository;
        this.modelMapper = modelMapper;
        this.bookingStateValidator = bookingStateValidator;
    }

    @Override
    public Page<BookingResponseDTO> getBookings(Pageable pageable) {
        Page<BookingEntity> bookingEntities = bookingRepository.findAll(pageable);
        List<BookingResponseDTO> bookingResponseDTOS = bookingEntities
                .getContent()
                .stream()
                .map(bookingEntity -> modelMapper.map(bookingEntity, BookingResponseDTO.class))
                .collect(Collectors.toList());;
        return new PageImpl<>(bookingResponseDTOS, pageable, bookingEntities.getTotalElements());
    }

    @Override
    public BookingResponseDTO getBookingById(Long bookingId) throws NoSuchElementException {
        return modelMapper.map(bookingRepository.findById(bookingId).orElseThrow(), BookingResponseDTO.class);
    }

    @Override
    public Page<BookingResponseDTO> getReservedBookings(Pageable pageable) {
        Page<BookingEntity> bookingEntities = bookingRepository.findAllReservedBookings(pageable);
        List<BookingResponseDTO> bookingResponseDTOList = bookingEntities
                .getContent()
                .stream()
                .map(bookingEntity -> modelMapper.map(bookingEntity, BookingResponseDTO.class))
                .collect(Collectors.toList());
        return new PageImpl<>(bookingResponseDTOList, pageable, bookingEntities.getTotalElements());
    }

    @Override
    public Page<BookingResponseDTO> getRentedBookings(Pageable pageable) {
        Page<BookingEntity> bookingEntities = bookingRepository.findAllRentedBookings(pageable);
        List<BookingResponseDTO> bookingResponseDTOList = bookingEntities
                .getContent()
                .stream()
                .map(bookingEntity -> modelMapper.map(bookingEntity, BookingResponseDTO.class))
                .collect(Collectors.toList());
        return new PageImpl<>(bookingResponseDTOList, pageable, bookingEntities.getTotalElements());
    }

    @Override
    public BookingResponseDTO cancelBooking(Long bookingId) throws NoSuchElementException, BookingStateException {
        return updateBookingStatus(bookingId, BookingStateCodeEnum.CAN);
    }

    @Override
    public BookingResponseDTO rentBooking(Long bookingId) throws NoSuchElementException, BookingStateException {
        return updateBookingStatus(bookingId, BookingStateCodeEnum.REN);
    }

    @Override
    public BookingResponseDTO returnBooking(Long bookingId) throws NoSuchElementException, BookingStateException {
        return updateBookingStatus(bookingId, BookingStateCodeEnum.RET);
    }

    private BookingResponseDTO updateBookingStatus(Long bookingId, BookingStateCodeEnum newBookingState) throws NoSuchElementException, BookingStateException {
        BookingEntity bookingEntity = bookingRepository.findById(bookingId).orElseThrow();
        bookingStateValidator.validateBookingStateDuringUpdate(bookingEntity, newBookingState);
        BookingStateEntity newBookingStateEntity = bookingStateRepository
                .findById(newBookingState)
                .orElseThrow(InternalError::new);
        bookingEntity.setBookingStateCode(newBookingStateEntity);
        return modelMapper.map(bookingRepository.save(bookingEntity), BookingResponseDTO.class);
    }
}
