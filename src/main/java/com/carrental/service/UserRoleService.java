package com.carrental.service;

import com.carrental.model.entity.UserRole;

import java.util.List;

public interface UserRoleService {

  public List<UserRole> getAllUserRole();

  public List<UserRole> getUnexistingDistinctUserRolesForUser(Long id);
}
