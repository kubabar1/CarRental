package com.carrental.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.carrental.model.User;
import com.carrental.model.UserRole;

public interface UserRoleRepository extends JpaRepository<User, Long>, UserRoleRepositoryCustom {

	@Query("SELECT ur FROM UserRole ur WHERE ur.id=:id")
	public UserRole getUserRoleById(@Param("id") Long id);
	
	@Query("SELECT ur FROM UserRole ur")
	public List<UserRole> getAllUserRole();

}
