package com.carrental.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.model.Comment;
import com.carrental.service.CommentServiceImpl;
import com.carrental.service.StarsServiceImpl;

@RestController
@RequestMapping(value = "/comments")
public class CommentController {
	
	@Autowired
	CommentServiceImpl commentService;
	
	@Autowired
	StarsServiceImpl starsService;
	
	@RequestMapping(value = { "/{vehicleID}" }, method = RequestMethod.GET)
	public Page<Comment> addCommentForVehicle(@PathVariable Long vehicleID, @RequestParam(value = "page") int page,@RequestParam(value = "number") int number) {
		return commentService.getCommentsForVehicle(vehicleID,new PageRequest(page, number));


	}

	@RequestMapping(value = { "/{vehicleID}" }, method = RequestMethod.POST)
	public void addCommentAndStarsForVehicle(@PathVariable Long vehicleID, @RequestBody Comment comment) {

		System.out.println(comment.toString());

		commentService.addComment(comment, vehicleID);
		
		starsService.setStars(vehicleID);
	}
}
