package com.carrental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.model.User;
import com.carrental.model.Vehicle;
import com.carrental.service.VehicleServiceImpl;

@RestController
@RequestMapping(value = { "/carlist" })
public class VehicleListController {

	@Autowired
	VehicleServiceImpl vehicleService;

	@RequestMapping(method = RequestMethod.GET)
	public List<Vehicle> getCarListForFirstPage() {

		int number = 20;
		int page = 1;

		return vehicleService.getCarListForPage(page, number);
	}

	@RequestMapping(method = RequestMethod.GET, params = "page")
	public List<Vehicle> getCarListForPageNumber(@RequestParam(value = "page", required = true) int page) {

		int number = 20;

		return vehicleService.getCarListForPage(page, number);
	}

}
