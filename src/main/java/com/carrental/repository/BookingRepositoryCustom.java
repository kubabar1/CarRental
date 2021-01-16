package com.carrental.repository;

import com.carrental.exception.BookingUnavailableVehicleException;
import com.carrental.model.Booking;

public interface BookingRepositoryCustom {

  public void addBooking(Booking booking) throws BookingUnavailableVehicleException;

  public void cancelBooking(Long bookingId);

  public void bookingRent(Long bookingId);

  public void bookingReturn(Long bookingId);
}
