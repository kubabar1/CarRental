package com.carrental.bookingservice.repository;

import com.carrental.bookingservice.model.entity.BookingEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import java.util.Optional;
import java.util.Set;

public interface BookingRepository extends PagingAndSortingRepository<BookingEntity, Long> {

    Set<BookingEntity> findAll();

    @Query("select b from bookings b where UPPER(b.bookingStateCode.bookingCode) like 'RES'")
    Page<BookingEntity> findAllReservedBookings(Pageable pageable);

    @Query("select b from bookings b where UPPER(b.bookingStateCode.bookingCode) like 'REN'")
    Page<BookingEntity> findAllRentedBookings(Pageable pageable);

    Optional<BookingEntity> findById(Long id);

    Optional<BookingEntity> findByIdAndUserId(Long bookingId, Long userId);

    Optional<Page<BookingEntity>> findAllByUserId(Long userId, Pageable pageable);

    @Query("select b from bookings b where UPPER(b.bookingStateCode.bookingCode) like 'RES' and b.userId = :userId")
    Page<BookingEntity> findAllReservedByUserId(@Param("userId") Long userId, Pageable pageable);

    @Query("select b from bookings b where UPPER(b.bookingStateCode.bookingCode) like 'REN' and b.userId = :userId")
    Page<BookingEntity> findAllRentedByUserId(@Param("userId") Long userId, Pageable pageable);
}
