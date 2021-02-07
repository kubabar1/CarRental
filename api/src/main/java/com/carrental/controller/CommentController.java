package com.carrental.controller;

import com.carrental.model.entity.Comment;
import com.carrental.service.CommentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping(value = "/comments")
public class CommentController {

  @Autowired CommentServiceImpl commentService;

  @RequestMapping(
      value = {"/{vehicleID}"},
      method = RequestMethod.GET)
  public Page<Comment> getVehicleCommentsForPage(
      @PathVariable Long vehicleID,
      @RequestParam(value = "page") int page,
      @RequestParam(value = "number") int number) {
    return commentService.getCommentsForVehicle(vehicleID, new PageRequest(page, number));
  }

  @RequestMapping(
      value = {"/all/{vehicleID}"},
      method = RequestMethod.GET)
  public List<Comment> getAllVehicleComments(@PathVariable Long vehicleID) {
    return commentService.getAllForVehicle(vehicleID);
  }

  @RequestMapping(
      value = {"/{vehicleID}"},
      method = RequestMethod.POST)
  public void addCommentForVehicle(@PathVariable Long vehicleID, @RequestBody Comment comment) {
    commentService.addComment(comment);
  }
}
