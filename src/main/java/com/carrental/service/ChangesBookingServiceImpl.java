package com.carrental.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import com.carrental.model.ChangesBooking;
import com.carrental.repository.ChangesBookingRepository;

@Service("changesBookingServiceImpl")
public class ChangesBookingServiceImpl implements ChangesBookingService {

	@Autowired
	ChangesBookingRepository changesBookingRepository;

	public Page<ChangesBooking> getChangesBookingsForPage(Pageable pageable) {
		return changesBookingRepository.getChangesBookingsForPage(pageable);
	}

}
