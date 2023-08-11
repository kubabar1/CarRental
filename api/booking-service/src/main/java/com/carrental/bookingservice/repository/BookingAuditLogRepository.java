package com.carrental.bookingservice.repository;

import com.carrental.bookingservice.model.entity.BookingAuditLogEntity;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface BookingAuditLogRepository extends PagingAndSortingRepository<BookingAuditLogEntity, Long>, JpaSpecificationExecutor<BookingAuditLogEntity> {
}
