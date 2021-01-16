package com.carrental.controller;

import com.carrental.model.User;
import com.carrental.model.UserRole;
import com.carrental.service.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping(value = {"/userlist"})
public class UsersController {

  @Autowired UserServiceImpl userService;

  @RequestMapping(
      method = RequestMethod.GET,
      params = {"page", "number"})
  public Page<User> getUserList(
      @RequestParam(value = "page") int page, @RequestParam(value = "number") int number) {
    return userService.getUsersForPage(new PageRequest(page, number));
  }

  @RequestMapping(value = "/adduserrole/{userId}", method = RequestMethod.PUT)
  public void addUserRole(@PathVariable Long userId, @RequestBody UserRole userRole) {
    // System.out.println(userRole.getId());
    userService.addRoleToUser(userId, userRole.getId());
  }

  @RequestMapping(value = "/{id}", method = RequestMethod.GET)
  public User getUserById(@PathVariable Long id) {
    return userService.getUserById(id);
  }

  @RequestMapping(value = "/{userlogin}", method = RequestMethod.PUT)
  public void updateUser(@PathVariable String userlogin, @RequestBody User userUpdate) {

    System.out.println(userUpdate.toString());
    userService.updateUser(userlogin, userUpdate);
  }

  @RequestMapping(
      method = RequestMethod.GET,
      params = {"login"})
  public User getUserByLogin(@RequestParam(value = "login") String login) {
    return userService.getUserByLogin(login);
  }
}
