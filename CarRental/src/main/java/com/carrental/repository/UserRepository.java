package com.carrental.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.carrental.model.Blog;
import com.carrental.model.User;

public interface UserRepository extends JpaRepository<User, Long>, UserRepositoryCustom {

	@Query("SELECT u FROM User u LEFT JOIN FETCH u.userRolesList")
	public List<User> getAllUsers();

	@Query("SELECT u FROM User u LEFT JOIN FETCH u.userRolesList WHERE u.id=:id")
	public User getUserById(@Param("id") Long id);

	@Query("SELECT u FROM User u LEFT JOIN FETCH u.userRolesList WHERE u.login=:login")
	public User getUserByLogin(@Param("login") String login);

}
