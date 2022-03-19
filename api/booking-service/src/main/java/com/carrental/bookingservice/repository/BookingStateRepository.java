package com.carrental.bookingservice.repository;

import com.carrental.bookingservice.model.constants.BookingStateCodeEnum;
import com.carrental.bookingservice.model.entity.BookingStateEntity;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface BookingStateRepository extends PagingAndSortingRepository<BookingStateEntity, BookingStateCodeEnum> {
}
