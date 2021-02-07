package com.carrental.controller;

import com.carrental.model.entity.Comment;
import com.carrental.model.entity.Vehicle;
import com.carrental.service.VehicleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = {"/carlist/{id}"})
public class VehiclePropertiesController {

  @Autowired VehicleServiceImpl vehicleService;

  @RequestMapping(method = RequestMethod.GET)
  public Vehicle getVehicleProperties(@PathVariable Long id) {

    return vehicleService.getVehicleById(id);
  }

  @RequestMapping(value = "/addcomment", method = RequestMethod.POST)
  public Comment addComment(@RequestBody Comment comment) {
    return null;
  }
}
