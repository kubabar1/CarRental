package com.carrental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.model.Location;
import com.carrental.service.LocationServiceImpl;

@RestController
@RequestMapping(value = { "/locations" })
public class LocationController {

	@Autowired
	LocationServiceImpl locationService;

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Location getVehicleProperties(@PathVariable Long id) {

		return locationService.getLocationById(id);
	}
}
