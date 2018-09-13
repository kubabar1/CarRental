package com.carrental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.exception.BookingUnavailableVehicleException;
import com.carrental.model.Booking;
import com.carrental.repository.BookingRepository;

@Service("bookingService")
@Transactional
public class BookingServiceImpl implements BookingService {

	@Autowired
	private BookingRepository bookingRepository;

	@Override
	public void addBooking(Booking booking) throws BookingUnavailableVehicleException {
		bookingRepository.addBooking(booking);
	}

	@Override
	public void cancelBooking(Long bookingId) {
		bookingRepository.cancelBooking(bookingId);
	}

	@Override
	public void bookingRent(Long bookingId) {
		bookingRepository.bookingRent(bookingId);
	}

	@Override
	public void bookingReturn(Long bookingId) {
		bookingRepository.bookingReturn(bookingId);
	}

	@Override
	public Page<Booking> getBookingsForPage(Pageable pageable) {
		return bookingRepository.getBookingsForPage(pageable);
	}

	@Override
	public Page<Booking> getBookingsRentedForPage(Pageable pageable) {
		return bookingRepository.getBookingsRentedForPage(pageable);
	}

	@Override
	public Page<Booking> getBookingsReservedForPage(Pageable pageable) {
		return bookingRepository.getBookingsReservedForPage(pageable);
	}

	@Override
	public Page<Booking> getBookingsCanceledForPage(Pageable pageable) {
		return bookingRepository.getBookingsCanceledForPage(pageable);
	}

	@Override
	public Page<Booking> getBookingsReturnedForPage(Pageable pageable) {
		return bookingRepository.getBookingsReturnedForPage(pageable);
	}

	@Override
	public Booking getBookingsById(Long bookingId) {
		return bookingRepository.getBookingsById(bookingId);
	}

	@Override
	public List<Booking> getAllBookings() {
		return bookingRepository.getAllBookings();
	}

}
