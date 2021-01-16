package com.carrental.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.ResponseBody;

import com.carrental.dto.UserRegistrationDto;
import com.carrental.exception.EmailExistsException;
import com.carrental.exception.LoginExistsException;
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
	public User getUserById(Long id) {
		return userRepository.getUserById(id);
	}

	@Override
	public User getUserByLogin(String login) {
		return userRepository.getUserByLogin(login);
	}

	@Override
	public User addUser(UserRegistrationDto user) throws EmailExistsException, LoginExistsException {
		if (checkLoginExists(user.getLogin())) {
			throw new LoginExistsException("There is an account with that login: " + user.getLogin());
		}
		if (checkEmailExists(user.getEmail())) {
			throw new EmailExistsException("There is an account with that email adress: " + user.getEmail());
		}

		return userRepository.addUser(user);
	}

	@Override
	public Page<User> getUsersForPage(Pageable pageable) {
		return userRepository.getUsersForPage(pageable);
	}

	@Override
	public int updateUser(String userlogin, User userUpdate) {
		return userRepository.updateUser(userlogin, userUpdate);
	}
	
	@Override
	public void addRoleToUser(Long userId, Long roleId) {
		userRepository.addRoleToUser(userId, roleId);
	}

	public boolean checkLoginExists(String login) {
		User user = null;
		user = userRepository.getUserByLogin(login);

		if (user != null) {
			return true;
		} else {
			return false;
		}
	}

	public boolean checkEmailExists(String email) {
		User user = null;
		user = userRepository.getUserByEmail(email);

		if (user != null) {
			return true;
		} else {
			return false;
		}
	}

}
