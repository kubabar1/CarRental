package com.carrental.controller;

import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.model.VehicleFilterWrapper;
import com.carrental.model.User;
import com.carrental.model.Vehicle;
import com.carrental.service.VehicleServiceImpl;

@RestController
@RequestMapping(value = { "/carlist" })
public class VehicleListController {

	@Autowired
	VehicleServiceImpl vehicleService;

	@RequestMapping(method = RequestMethod.GET, params = { "page", "number" })
	public Page<Vehicle> getVehicleList(@RequestParam(value = "page") int page,
			@RequestParam(value = "number") int number) {
		return vehicleService.getVehiclesForPage(new PageRequest(page, number));
	}

	@RequestMapping(value = "/allcars", method = RequestMethod.GET)
	public List<Vehicle> getAllVehicles() {
		return vehicleService.getAllVehicles();
	}
	
	@RequestMapping(method = RequestMethod.GET, params = { "city" })
	public List<Vehicle> getVehicleListForCity(@RequestParam(value = "city") String city){
		return vehicleService.getVehicleListForCity(city);
	}
	/*
	 * @RequestMapping(value = "/search/maxcost", method = RequestMethod.GET) public
	 * BigDecimal vehicleMaxCost() {
	 * 
	 * return vehicleService.getMaxCost(); }
	 * 
	 * @RequestMapping(value = "/search/maxseatsnumber", method = RequestMethod.GET)
	 * public Integer vehicleMaxSeatsNumber() {
	 * 
	 * return vehicleService.getMaxSeatsNumber(); }
	 * 
	 * @RequestMapping(value = "/search/maxdoorsnumber", method = RequestMethod.GET)
	 * public Integer vehicleMaxDoorsNumber() {
	 * 
	 * return vehicleService.getMaxDoorsNumber(); }
	 * 
	 * @RequestMapping(value = "/search/maxproductionyear", method =
	 * RequestMethod.GET) public Integer vehicleMaxProductionYear() {
	 * 
	 * return vehicleService.getMaxProductionYear(); }
	 */

}
