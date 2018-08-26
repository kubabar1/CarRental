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
	
	@RequestMapping(method=RequestMethod.GET, params = {"page","number"})
	public Page<Vehicle> getVehicleList(@RequestParam(value = "page") int page, @RequestParam(value = "number") int number) {
		return vehicleService.getAllVehicles(new PageRequest(page, number));
	}

	

	@RequestMapping(method = RequestMethod.POST)
	public List<Vehicle> getFiltredCarListForFirstPage(@RequestBody VehicleFilterWrapper carFilter) {

		int number = 20;
		int page = 1;

		System.out.println("filter test");
		System.out.println(carFilter.toString());
		System.out.println("filter test");

		return vehicleService.getFiltredCarListForPage(carFilter, page, number);
	}

	@RequestMapping(method = RequestMethod.POST, params = "page")
	public List<Vehicle> getFiltredCarListForPageNumber(@RequestParam(value = "page", required = true) int page,
			@RequestBody VehicleFilterWrapper carFilter) {

		int number = 20;

		return vehicleService.getFiltredCarListForPage(carFilter, page, number);
	}

	@RequestMapping(value = "/search/brandlist", method = RequestMethod.GET)
	public List<String> vehicleSearchGetBrandList() {

		return vehicleService.getBrandList();
	}

	@RequestMapping(value = "/search/modellist", method = RequestMethod.GET)
	public List<String> vehicleSearchGetModelListForBrand(@RequestBody String brand) {

		return vehicleService.getModelListForBrand(brand);
	}

	@RequestMapping(value = "/search/bodytypelist", method = RequestMethod.GET)
	public List<String> vehicleSearchGetBodTypeList() {

		return vehicleService.getBodTypeList();
	}

	@RequestMapping(value = "/search/citylist", method = RequestMethod.GET)
	public List<String> vehicleSearchGetCityList() {

		return vehicleService.getCityList();
	}

	@RequestMapping(value = "/search/colorlist", method = RequestMethod.GET)
	public List<String> vehicleSearchGetColorList() {

		return vehicleService.getColorList();
	}

	@RequestMapping(value = "/search/modelsforbrand", method = RequestMethod.POST)
	public List<String> getModelsForBrand(@RequestBody String brand) {
		return vehicleService.getModelListForBrand(brand);
	}

	@RequestMapping(value = "/vehiclescount", method = RequestMethod.GET)
	public Long getVehiclesCount() {
		return vehicleService.getVehiclesCount();
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
