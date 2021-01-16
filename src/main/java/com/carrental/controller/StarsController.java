package com.carrental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.model.Comment;
import com.carrental.model.Stars;
import com.carrental.service.StarsServiceImpl;

@RestController
@RequestMapping(value = "/stars")
public class StarsController {

	@Autowired
	private StarsServiceImpl starsService;

	@RequestMapping(value = { "/{vehicleId}" }, method = RequestMethod.GET)
	public Double getAvgStarsNumberForVehicle(@PathVariable Long vehicleId) {
		return starsService.getAvgStarsByVehicleId(vehicleId);
	}

	@RequestMapping(value = { "/all/{vehicleID}" }, method = RequestMethod.GET)
	public List<Stars> getStarsForVehicle(@PathVariable Long vehicleId) {
		return starsService.getStarsByVehicleId(vehicleId);
	}
	
	@RequestMapping(value = { "/{vehicleID}" }, method = RequestMethod.POST)
	public void addStarsForVehicle(@PathVariable Long vehicleID, @RequestBody Stars stars) {
		System.out.println(stars.toString());
		starsService.addStars(stars);
	}
}
