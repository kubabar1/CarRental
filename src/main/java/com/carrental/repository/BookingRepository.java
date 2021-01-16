package com.carrental.repository;

import com.carrental.model.Booking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface BookingRepository
    extends PagingAndSortingRepository<Booking, Long>, BookingRepositoryCustom {

  @Query(value = "SELECT b FROM Booking b", countQuery = "SELECT COUNT(b) FROM Booking b")
  public Page<Booking> getBookingsForPage(Pageable pageable);

  @Query(
      value = "SELECT b FROM Booking b WHERE b.bookingStateCode='REN'",
      countQuery = "SELECT COUNT(b) FROM Booking b WHERE b.bookingStateCode='REN'")
  public Page<Booking> getBookingsRentedForPage(Pageable pageable);

  @Query(
      value = "SELECT b FROM Booking b WHERE b.bookingStateCode='RES'",
      countQuery = "SELECT COUNT(b) FROM Booking b WHERE b.bookingStateCode='RES'")
  public Page<Booking> getBookingsReservedForPage(Pageable pageable);

  @Query(
      value = "SELECT b FROM Booking b WHERE b.bookingStateCode='CAN'",
      countQuery = "SELECT COUNT(b) FROM Booking b WHERE b.bookingStateCode='CAN'")
  public Page<Booking> getBookingsCanceledForPage(Pageable pageable);

  @Query(
      value = "SELECT b FROM Booking b WHERE b.bookingStateCode='RET'",
      countQuery = "SELECT COUNT(b) FROM Booking b WHERE b.bookingStateCode='RET'")
  public Page<Booking> getBookingsReturnedForPage(Pageable pageable);

  @Query(
      value = "SELECT b FROM Booking b WHERE b.userId=:userId",
      countQuery = "SELECT COUNT(b) FROM Booking b WHERE b.userId=:userId")
  public Page<Booking> getUserBookingsForPage(Pageable pageable, @Param("userId") Long userId);

  @Query(
      value = "SELECT b FROM Booking b WHERE b.userId=:userId AND b.bookingStateCode='RES'",
      countQuery =
          "SELECT COUNT(b) FROM Booking b WHERE b.userId=:userId AND b.bookingStateCode='RES'")
  public Page<Booking> getUserBookingsReservedForPage(
      Pageable pageable, @Param("userId") Long userId);

  @Query(
      value = "SELECT b FROM Booking b WHERE b.userId=:userId AND b.bookingStateCode='REN'",
      countQuery =
          "SELECT COUNT(b) FROM Booking b WHERE b.userId=:userId AND b.bookingStateCode='REN'")
  public Page<Booking> getUserBookingsRentedForPage(
      Pageable pageable, @Param("userId") Long userId);

  @Query(value = "SELECT b FROM Booking b WHERE b.id=:bookingId")
  public Booking getBookingsById(@Param("bookingId") Long bookingId);

  @Query(value = "SELECT b FROM Booking b")
  public List<Booking> getAllBookings();
}
