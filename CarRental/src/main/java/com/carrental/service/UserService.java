package com.carrental.service;

import java.util.List;

import com.carrental.dto.UserRegistrationDto;
import com.carrental.exception.EmailExistsException;
import com.carrental.exception.LoginExistsException;
import com.carrental.model.User;

public interface UserService {

	public List<User> getUserListForPage(int page, int nb);

	public List<User> getAllUsers();

	public User getUserById(Long id);
	
	public User getUserByLogin(String login);
	
	public User addUser(UserRegistrationDto user) throws EmailExistsException, LoginExistsException;

}
