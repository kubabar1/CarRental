package com.carrental.controller;

import com.carrental.model.Location;
import com.carrental.service.LocationServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = {"/locations"})
public class LocationController {

  @Autowired LocationServiceImpl locationService;

  @RequestMapping(method = RequestMethod.GET)
  public List<Location> getLocationList() {
    return locationService.getLocationList();
  }

  @RequestMapping(
      method = RequestMethod.GET,
      params = {"page", "number"})
  public Page<Location> getAllBookingsForPage(
      @RequestParam(value = "page") int page, @RequestParam(value = "number") int number) {
    return locationService.getLocationListForPage(new PageRequest(page, number));
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public Location getLocationById(@PathVariable Long id) {

    return locationService.getLocationById(id);
  }
}
