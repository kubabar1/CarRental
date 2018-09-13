package com.carrental.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.carrental.exception.BookingUnavailableVehicleException;
import com.carrental.model.Booking;

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
}
