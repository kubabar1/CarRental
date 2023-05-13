package com.carrental.bookingservice.repository;

import com.carrental.bookingservice.model.entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Optional;

public interface BookingRepository extends PagingAndSortingRepository<BookingEntity, Long>, JpaSpecificationExecutor<BookingEntity> {

    Optional<BookingEntity> findByIdAndUserId(Long bookingId, Long userId);
}
