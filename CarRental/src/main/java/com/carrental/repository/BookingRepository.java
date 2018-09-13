package com.carrental.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.model.Booking;
import com.carrental.model.Vehicle;

public interface BookingRepository extends PagingAndSortingRepository<Booking, Long>, BookingRepositoryCustom {

	@Query(value = "SELECT b FROM Booking b", countQuery = "SELECT COUNT(b) FROM Booking b")
	public Page<Booking> getBookingsForPage(Pageable pageable);

	@Query(value = "SELECT b FROM Booking b WHERE b.bookingStateCode='REN'", countQuery = "SELECT COUNT(b) FROM Booking b WHERE b.bookingStateCode='REN'")
	public Page<Booking> getBookingsRentedForPage(Pageable pageable);

	@Query(value = "SELECT b FROM Booking b WHERE b.bookingStateCode='RES'", countQuery = "SELECT COUNT(b) FROM Booking b WHERE b.bookingStateCode='RES'")
	public Page<Booking> getBookingsReservedForPage(Pageable pageable);

	@Query(value = "SELECT b FROM Booking b WHERE b.bookingStateCode='CAN'", countQuery = "SELECT COUNT(b) FROM Booking b WHERE b.bookingStateCode='CAN'")
	public Page<Booking> getBookingsCanceledForPage(Pageable pageable);

	@Query(value = "SELECT b FROM Booking b WHERE b.bookingStateCode='RET'", countQuery = "SELECT COUNT(b) FROM Booking b WHERE b.bookingStateCode='RET'")
	public Page<Booking> getBookingsReturnedForPage(Pageable pageable);

	@Query(value = "SELECT b FROM Booking b WHERE b.id=:bookingId")
	public Booking getBookingsById(@Param("bookingId") Long bookingId);

	@Query(value = "SELECT b FROM Booking b")
	public List<Booking> getAllBookings();

}
