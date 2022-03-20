package com.carrental.bookingservice.repository;

import com.carrental.bookingservice.model.entity.BookingAuditLogEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Set;

public interface BookingAuditLogRepository extends PagingAndSortingRepository<BookingAuditLogEntity, Long> {

    Set<BookingAuditLogEntity> findAll();
}
