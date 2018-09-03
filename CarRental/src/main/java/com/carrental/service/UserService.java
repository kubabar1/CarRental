package com.carrental.service;

import java.util.List;

import com.carrental.model.User;

public interface UserService {

	public List<User> getUserListForPage(int page, int nb);

	public List<User> getAllUsers();

	public User getUserById(Long id);
	
	public User getUserByLogin(String login);

}
