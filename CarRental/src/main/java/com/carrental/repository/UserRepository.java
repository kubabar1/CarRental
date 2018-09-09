package com.carrental.repository;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.PagingAndSortingRepository;
import org.springframework.data.repository.query.Param;

import com.carrental.model.Blog;
import com.carrental.model.User;
import com.carrental.model.Vehicle;

public interface UserRepository extends PagingAndSortingRepository<User, Long>, UserRepositoryCustom {

	@Query("SELECT u FROM User u LEFT JOIN FETCH u.userRolesList")
	public List<User> getAllUsers();

	@Query("SELECT u FROM User u LEFT JOIN FETCH u.userRolesList WHERE u.id=:id")
	public User getUserById(@Param("id") Long id);

	@Query("SELECT u FROM User u LEFT JOIN FETCH u.userRolesList WHERE u.login=:login")
	public User getUserByLogin(@Param("login") String login);

	@Query(value = "SELECT DISTINCT u FROM User u LEFT JOIN FETCH u.userRolesList", countQuery = "SELECT COUNT(u) FROM User u")
	public Page<User> getUsersForPage(Pageable pageable);

}
