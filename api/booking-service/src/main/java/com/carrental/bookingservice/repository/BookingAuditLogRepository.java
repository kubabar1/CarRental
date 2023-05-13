package com.carrental.bookingservice.repository;

import com.carrental.bookingservice.model.entity.BookingAuditLogEntity;
import com.carrental.bookingservice.model.entity.BookingEntity;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Set;

public interface BookingAuditLogRepository extends PagingAndSortingRepository<BookingAuditLogEntity, Long>, JpaSpecificationExecutor<BookingAuditLogEntity> {
}
