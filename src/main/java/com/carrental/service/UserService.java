package com.carrental.service;

import com.carrental.model.dto.UserRegistrationDto;
import com.carrental.exception.EmailExistsException;
import com.carrental.exception.LoginExistsException;
import com.carrental.model.entity.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

import java.util.List;

public interface UserService {

  public List<User> getAllUsers();

  public User getUserById(Long id);

  public User getUserByLogin(String login);

  public User addUser(UserRegistrationDto user) throws EmailExistsException, LoginExistsException;

  public Page<User> getUsersForPage(Pageable pageable);

  public int updateUser(String userlogin, User userUpdate);

  public void addRoleToUser(Long userId, Long roleId);
}
