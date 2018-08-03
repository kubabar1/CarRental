package com.carrental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.model.JobPosition;
import com.carrental.service.JobPositionServiceImpl;

@RestController
@RequestMapping(value = { "/jobposition" })
public class JobPositionController {

	@Autowired
	JobPositionServiceImpl jobPositionService;

	@RequestMapping(method = RequestMethod.GET)
	public List<JobPosition> getCarListForFirstPage() {

		int number = 10;
		int page = 1;

		return jobPositionService.getJobPositionListForPage(page, number);
	}

	@RequestMapping(method = RequestMethod.GET, params = "page")
	public List<JobPosition> getCarListForPageNumber(@RequestParam(value = "page", required = true) int page) {

		int number = 10;

		return jobPositionService.getJobPositionListForPage(page, number);
	}

}
