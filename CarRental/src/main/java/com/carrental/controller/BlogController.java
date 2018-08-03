package com.carrental.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.model.Blog;
import com.carrental.model.Vehicle;
import com.carrental.service.BlogServiceImpl;
import com.carrental.service.VehicleServiceImpl;

@RestController
@RequestMapping(value = { "/bloglist" })
public class BlogController {

	@Autowired
	BlogServiceImpl blogService;

	@RequestMapping(method = RequestMethod.GET)
	public List<Blog> getArticleListForFirstPage() {

		int number = 8;
		int page = 1;

		return blogService.getArticleListForPage(page, number);
	}

	@RequestMapping(method = RequestMethod.GET, params = "page")
	public List<Blog> getArticleListForPageNumber(@RequestParam(value = "page", required = true) int page) {

		int number = 8;

		return blogService.getArticleListForPage(page, number);
	}

	@RequestMapping(value = "/{id}", method = RequestMethod.GET)
	public Blog getArticleListForPageNumber(@PathVariable Long id) {

		return blogService.getArticleById(id);
	}

}
