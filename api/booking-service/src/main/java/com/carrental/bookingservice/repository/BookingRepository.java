package com.carrental.bookingservice.repository;

import com.carrental.bookingservice.model.constants.BookingStateCodeEnum;
import com.carrental.bookingservice.model.entity.BookingEntity;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.Optional;
import java.util.Set;

public interface BookingRepository extends PagingAndSortingRepository<BookingEntity, Long>, JpaSpecificationExecutor<BookingEntity> {

    Optional<BookingEntity> findByIdAndUserId(Long bookingId, Long userId);

    Set<BookingEntity> findByReceiptDateIsBeforeAndBookingStateCode_BookingCodeEquals(LocalDate localDate, BookingStateCodeEnum bookingStateCodeEnum);
}
