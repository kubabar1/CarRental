package com.carrental.controller;

import java.io.BufferedOutputStream;
import java.io.File;
import java.io.FileOutputStream;
import java.io.FileWriter;
import java.io.IOException;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.List;
import java.util.UUID;


import org.apache.commons.io.FilenameUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.carrental.dto.VehicleAddDto;
import com.carrental.dto.VehicleFilterDto;
import com.carrental.model.Comment;
import com.carrental.model.Equipment;
import com.carrental.model.User;
import com.carrental.model.Vehicle;
import com.carrental.service.EquipmentServiceImpl;
import com.carrental.service.VehicleServiceImpl;

@RestController
@RequestMapping(value = { "/carlist" })
public class VehicleController {

	@Autowired
	VehicleServiceImpl vehicleService;
	
	@Autowired
	EquipmentServiceImpl equipmentService;

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
	public List<Vehicle> getAvailableVehicleListForLocation(@RequestParam(value = "city") Long city) {
		return vehicleService.getAvailableVehicleListForLocation(city);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.POST)
	public void updateVehicle(@PathVariable Long id, VehicleAddDto vehicleAddDto,
			@RequestParam(value = "image", required = false) MultipartFile image) {

		System.out.println("Updating vehicle.");
		
		if (image != null) {
			String photoName = updateVehicleImage(image, id);
			vehicleAddDto.setFileName(photoName);
		}

		vehicleService.updateVehicle(vehicleAddDto);

	}

	@RequestMapping(method = RequestMethod.POST)
	public void addVehicle(VehicleAddDto vehicleAddDto,
			@RequestParam(value = "image", required = true) MultipartFile image) {

		System.out.println("Adding vehicle to database.");
		
		String fileName = addVehicleImage(image);
		vehicleAddDto.setFileName(fileName);

		vehicleService.addVehicle(vehicleAddDto);

	}
	
	@RequestMapping(value="/equipment/{vehicleID}", method = RequestMethod.POST)
	public void addEquipmentToVehicle(@PathVariable Long vehicleID, @RequestBody Equipment equipment) {
		Equipment eqp = equipmentService.getEquipmentByCode(equipment.getEquipmentCode());
		
		vehicleService.addEquipment(eqp,vehicleID);
	}
	

	@RequestMapping(value = { "/equipment/{vehicleID}" }, method = RequestMethod.DELETE)
	public void removeEquipmentFromVehicle(@PathVariable Long vehicleID, @RequestBody Equipment equipment) {
		vehicleService.removeEquipment(equipment.getEquipmentCode(),vehicleID);
	}

	private String addVehicleImage(MultipartFile image) {

		UUID uuid = UUID.randomUUID();
		
		String fileName = uuid.toString() + "." + FilenameUtils.getExtension(image.getOriginalFilename());

		try {
			byte[] bytes = image.getBytes();

			String filePath = "C:/carrental/img/vehicles_img/" + fileName;

			System.out.println("Dodaje plik -> " + filePath);

			File fnew = new File(filePath);
			fnew.createNewFile();
			BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(fnew));
			stream.write(bytes);
			stream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return fileName;
	}

	private String updateVehicleImage(MultipartFile image, Long id) {

		Vehicle vehicle = vehicleService.getVehicleById(id);

		String fileName = vehicle.getVehicleParameters().getPhotoName();

		try {
			byte[] bytes = image.getBytes();

			String filePath = "C:/carrental/img/vehicles_img/" + fileName;

			System.out.println("Dodaje plik -> " + filePath);

			File fnew = new File(filePath);
			fnew.createNewFile();
			BufferedOutputStream stream = new BufferedOutputStream(new FileOutputStream(fnew));
			stream.write(bytes);
			stream.close();
		} catch (IOException e) {
			e.printStackTrace();
		}

		return fileName;
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
