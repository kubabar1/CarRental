package com.carrental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.carrental.model.UserRole;
import com.carrental.repository.UserRoleRepository;

@Service("userRoleService")
@Transactional
public class UserRoleServiceImpl implements UserRoleService{

	@Autowired
	private UserRoleRepository userRoleRepository;
	
	@Override
	public List<UserRole> getAllUserRole() {
		return userRoleRepository.getAllUserRole();
	}

	@Override
	public List<UserRole> getUnexistingDistinctUserRolesForUser(Long id) {
		return userRoleRepository.getUnexistingDistinctUserRolesForUser(id);
	}

}
