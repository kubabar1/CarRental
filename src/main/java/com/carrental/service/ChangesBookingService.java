package com.carrental.service;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.carrental.model.ChangesBooking;

public interface ChangesBookingService {

	public Page<ChangesBooking> getChangesBookingsForPage(Pageable pageable);
	
}
