package com.carrental.repository;

import com.carrental.model.entity.UserRole;

import java.util.List;

public interface UserRoleRepositoryCustom {

  public List<UserRole> getUnexistingDistinctUserRolesForUser(Long id);
}
