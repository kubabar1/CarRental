package com.carrental.repository;

import java.util.List;

import com.carrental.model.UserRole;

public interface UserRoleRepositoryCustom {

	public List<UserRole> getUnexistingDistinctUserRolesForUser(Long id);
}
