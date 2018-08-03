package com.carrental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.model.Vehicle;
import com.carrental.service.VehicleServiceImpl;

@RestController
@RequestMapping(value = { "/bestoffer" })
public class BestOfferController {

	@Autowired
	VehicleServiceImpl vehicleService;

	@RequestMapping(method = RequestMethod.GET)
	public @ResponseBody List<Vehicle> getBestOfferCars() {

		int number = 12;
		int page = 1;

		return vehicleService.getBestOfferCars(page, number);
	}

	@RequestMapping(method = RequestMethod.GET, params = "page")
	public @ResponseBody List<Vehicle> getBestOffersListForPageNumber(
			@RequestParam(value = "page", required = true) int page) {

		int number = 12;

		return vehicleService.getBestOfferCars(page, number);
	}

}
