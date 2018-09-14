package com.carrental.repository;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

import com.carrental.model.Booking;
import com.carrental.model.ChangesBooking;

public interface ChangesBookingRepository extends PagingAndSortingRepository<ChangesBooking, Long> {

	@Query(value = "SELECT cb FROM ChangesBooking cb", countQuery = "SELECT COUNT(cb) FROM ChangesBooking cb")
	public Page<ChangesBooking> getChangesBookingsForPage(Pageable pageable);

}
