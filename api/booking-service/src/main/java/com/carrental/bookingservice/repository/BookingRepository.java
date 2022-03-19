package com.carrental.bookingservice.repository;

import com.carrental.bookingservice.model.entity.BookingEntity;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface BookingRepository extends PagingAndSortingRepository<BookingEntity, Long> {

    Set<BookingEntity> findAll();

    @Query("select b from bookings b where UPPER(b.bookingStateCode.bookingCode) like 'RES'")
    Set<BookingEntity> findAllReservedBookings();

    @Query("select b from bookings b where UPPER(b.bookingStateCode.bookingCode) like 'REN'")
    Set<BookingEntity> findAllRentedBookings();

    Optional<BookingEntity> findById(Long id);

    Optional<BookingEntity> findByIdAndUserId(Long bookingId, Long userId);

    Optional<Set<BookingEntity>> findAllByUserId(Long userId);

    @Query("select b from bookings b where UPPER(b.bookingStateCode.bookingCode) like 'RES' and b.userId = :userId")
    Set<BookingEntity> findAllReservedByUserId(@Param("userId") Long userId);

    @Query("select b from bookings b where UPPER(b.bookingStateCode.bookingCode) like 'REN' and b.userId = :userId")
    Set<BookingEntity> findAllRentedByUserId(@Param("userId") Long userId);
}
