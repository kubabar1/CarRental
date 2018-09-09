package com.carrental.service;

import java.util.List;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import com.carrental.dto.UserRegistrationDto;
import com.carrental.exception.EmailExistsException;
import com.carrental.exception.LoginExistsException;
import com.carrental.model.User;

public interface UserService {

	public List<User> getAllUsers();

	public User getUserById(Long id);
	
	public User getUserByLogin(String login);
	
	public User addUser(UserRegistrationDto user) throws EmailExistsException, LoginExistsException;
	
	public Page<User> getUsersForPage(Pageable pageable);

	public int updateUser(User userUpdate);
	
	public void addRoleToUser(Long userId, Long roleId);

}
