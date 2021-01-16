package com.carrental.service;

import com.carrental.model.ChangesBooking;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface ChangesBookingService {

  public Page<ChangesBooking> getChangesBookingsForPage(Pageable pageable);
}
