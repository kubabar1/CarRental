package com.carrental.controller;

import com.carrental.model.Vehicle;
import com.carrental.service.VehicleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = {"/bestoffer"})
public class BestOfferController {

  @Autowired VehicleServiceImpl vehicleService;

  @RequestMapping(
      method = RequestMethod.GET,
      params = {"page", "number"})
  public @ResponseBody Page<Vehicle> getBestOfferCars(
      @RequestParam(value = "page") int page, @RequestParam(value = "number") int number) {
    return vehicleService.getBestOfferCars(new PageRequest(page, number));
  }
}
