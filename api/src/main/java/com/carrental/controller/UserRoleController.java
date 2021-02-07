package com.carrental.controller;

import com.carrental.model.entity.UserRole;
import com.carrental.service.UserRoleServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping(value = "/roleslist")
public class UserRoleController {

  @Autowired private UserRoleServiceImpl userRolesService;

  @RequestMapping(method = RequestMethod.GET)
  public List<UserRole> getUserRoleList() {

    return userRolesService.getAllUserRole();
  }

  @RequestMapping(value = "/absentroles/{id}", method = RequestMethod.GET)
  public List<UserRole> getUnexistingDistinctUserRolesForUser(@PathVariable Long id) {

    return userRolesService.getUnexistingDistinctUserRolesForUser(id);
  }
}
