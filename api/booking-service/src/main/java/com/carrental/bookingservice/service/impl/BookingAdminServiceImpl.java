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
import org.springframework.stereotype.Service;

import java.util.NoSuchElementException;
import java.util.Set;
import java.util.stream.Collectors;

@Service
public class BookingAdminServiceImpl implements BookingAdminService {

    @Autowired
    private BookingRepository bookingRepository;

    @Autowired
    private BookingStateRepository bookingStateRepository;

    @Autowired
    private ModelMapper modelMapper;

    @Autowired
    private BookingStateValidator bookingStateValidator;


    @Override
    public Set<BookingResponseDTO> getBookings() {
        return bookingRepository.findAll().stream()
                .map(bookingEntity -> modelMapper.map(bookingEntity, BookingResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public BookingResponseDTO getBookingById(Long bookingId) throws NoSuchElementException {
        return modelMapper.map(
                bookingRepository.findById(bookingId).orElseThrow(), BookingResponseDTO.class);
    }

    @Override
    public Set<BookingResponseDTO> getReservedBookings() {
        return bookingRepository.findAllReservedBookings().stream()
                .map(bookingEntity -> modelMapper.map(bookingEntity, BookingResponseDTO.class))
                .collect(Collectors.toSet());
    }

    @Override
    public Set<BookingResponseDTO> getRentedBookings() {
        return bookingRepository.findAllRentedBookings().stream()
                .map(bookingEntity -> modelMapper.map(bookingEntity, BookingResponseDTO.class))
                .collect(Collectors.toSet());
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
