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
import com.carrental.service.UserServiceImpl;

@RestController
@RequestMapping(value = { "/users" })
public class UsersController {

	@Autowired
	UserServiceImpl userService;

	@RequestMapping(method = RequestMethod.GET)
	public List<User> getCarListForFirstPageNumber() {

		int page = 1;
		int number = 10;

		return userService.getUserListForPage(page, number);
	}

	@RequestMapping(method = RequestMethod.GET, params = { "page", "number" })
	public List<User> getCarListForPageNumber(@RequestParam(value = "page", required = true) int page,
			@RequestParam(value = "number", required = true) int number) {

		return userService.getUserListForPage(page, number);
	}
}
