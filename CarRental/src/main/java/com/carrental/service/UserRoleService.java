package com.carrental.service;

import java.util.List;

import com.carrental.model.UserRole;

public interface UserRoleService {
		
	public List<UserRole> getAllUserRole();
	
	public List<UserRole> getUnexistingDistinctUserRolesForUser(Long id);
		
}
