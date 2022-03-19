package com.carrental.bookingservice.repository;

import com.carrental.bookingservice.model.entity.BookingChangeEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

import java.util.Set;

public interface BookingChangeRepository extends PagingAndSortingRepository<BookingChangeEntity, Long> {

    Set<BookingChangeEntity> findAll();
}
