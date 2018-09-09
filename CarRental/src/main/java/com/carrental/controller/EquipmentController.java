package com.carrental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.model.Equipment;
import com.carrental.service.EquipmentServiceImpl;

@RestController
@RequestMapping(value = { "/equipmentlist"})
public class EquipmentController {
	
	@Autowired
	private EquipmentServiceImpl equipmentService;

	@RequestMapping(method = RequestMethod.GET)
	public List<Equipment> getEquipmentList() {
		return equipmentService.getEquipmentList();
	}
	
	@RequestMapping(value = { "/{id}"}, method = RequestMethod.GET)
	public List<Equipment> getUnexistingDistinctEquipmentListForVehicle(@PathVariable Long id) {
		return equipmentService.getUnexistingDistinctEquipmentListForVehicle(id);
	}
}
