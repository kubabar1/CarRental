package com.carrental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.model.Comment;
import com.carrental.model.Vehicle;
import com.carrental.service.VehicleServiceImpl;

@RestController
@RequestMapping(value = { "/carlist/{id}" })
public class VehiclePropertiesController {

	@Autowired
	VehicleServiceImpl vehicleService;

	@RequestMapping(method = RequestMethod.GET)
	public Vehicle getVehicleProperties(@PathVariable Long id) {

		return vehicleService.getVehicleById(id);
	}

	@RequestMapping(value = "/addcomment", method = RequestMethod.POST)
	public Comment addComment(@RequestBody Comment comment) {
		return null;
	}

}
