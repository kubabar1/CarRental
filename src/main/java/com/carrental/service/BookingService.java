package com.carrental.service;

import com.carrental.exception.BookingUnavailableVehicleException;
import com.carrental.model.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.io.File;
import java.io.IOException;
import java.util.List;

public interface BookingService {

  public void addBooking(Booking booking) throws BookingUnavailableVehicleException;

  public void cancelBooking(Long bookingId);

  public void bookingRent(Long bookingId);

  public void bookingReturn(Long bookingId);

  public Page<Booking> getBookingsForPage(Pageable pageable);

  public Page<Booking> getBookingsRentedForPage(Pageable pageable);

  public Page<Booking> getBookingsReservedForPage(Pageable pageable);

  public Page<Booking> getBookingsCanceledForPage(Pageable pageable);

  public Page<Booking> getBookingsReturnedForPage(Pageable pageable);

  public Booking getBookingsById(Long bookingId);

  public List<Booking> getAllBookings();

  public Page<Booking> getUserBookingsForPage(PageRequest pageRequest, Long userId);

  public Page<Booking> getUserBookingsReservedForPage(PageRequest pageRequest, Long userId);

  public Page<Booking> getUserBookingsRentedForPage(PageRequest pageRequest, Long userId);

  public File createExcelBookingListExelFile(List<Booking> bookingList) throws IOException;
}
