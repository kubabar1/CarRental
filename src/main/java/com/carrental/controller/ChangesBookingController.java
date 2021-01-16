package com.carrental.controller;

import com.carrental.model.entity.ChangesBooking;
import com.carrental.service.ChangesBookingServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = "/bookingchanges")
public class ChangesBookingController {

  @Autowired private ChangesBookingServiceImpl changesBookingService;

  @RequestMapping(
      method = RequestMethod.GET,
      params = {"page", "number"})
  public Page<ChangesBooking> getAllBookingChanges(
      @RequestParam(value = "page") int page, @RequestParam(value = "number") int number) {
    return changesBookingService.getChangesBookingsForPage(new PageRequest(page, number));
  }
}
