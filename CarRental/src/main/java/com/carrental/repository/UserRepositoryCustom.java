package com.carrental.repository;

import java.util.List;

import com.carrental.dto.UserRegistrationDto;
import com.carrental.model.User;

public interface UserRepositoryCustom {

	public List<User> getUserListForPage(int page, int nb);

	public User getUserByLogin(String login);

	public User getUserByEmail(String email);
	
	public User addUser(UserRegistrationDto user);

}
