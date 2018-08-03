package com.carrental.repository;

import java.util.List;

import com.carrental.model.User;


public interface UserRepositoryCustom {

	
	public List<User> getUserListForPage(int page, int nb);
}
