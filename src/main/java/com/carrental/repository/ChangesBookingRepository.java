package com.carrental.repository;

import com.carrental.model.ChangesBooking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;

public interface ChangesBookingRepository extends PagingAndSortingRepository<ChangesBooking, Long> {

  @Query(
      value = "SELECT cb FROM ChangesBooking cb",
      countQuery = "SELECT COUNT(cb) FROM ChangesBooking cb")
  public Page<ChangesBooking> getChangesBookingsForPage(Pageable pageable);
}
