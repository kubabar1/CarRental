package com.carrental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;

import com.carrental.model.User;
import com.carrental.repository.UserRepository;

@Service("userService")
@Transactional
public class UserServiceImpl implements UserService {

	@Autowired
	private UserRepository userRepository;

	@Override
	public List<User> getAllUsers() {
		return userRepository.getAllUsers();
	}

	@Override
	public List<User> getUserListForPage(int page, int nb) {
		return userRepository.getUserListForPage(page, nb);
	}

	@Override
	public User getUserById(Long id) {
		return userRepository.getUserById(id);
	}

	@Override
	public User getUserByLogin(String login) {
		return userRepository.getUserByLogin(login);
	}

}
