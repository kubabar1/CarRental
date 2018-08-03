package com.carrental.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.carrental.model.Blog;
import com.carrental.model.User;

public interface UserRepository extends JpaRepository<User, Long>,UserRepositoryCustom {

	@Query("select u from User u")
	public List<User> getAllUsers();

	public User getUserById(Long id);

}
