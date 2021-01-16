package com.carrental.repository;

import com.carrental.model.dto.UserRegistrationDto;
import com.carrental.model.entity.User;

public interface UserRepositoryCustom {

  public User getUserByLogin(String login);

  public User getUserByEmail(String email);

  public User addUser(UserRegistrationDto user);

  public int updateUser(String userlogin, User userUpdate);

  public void addRoleToUser(Long userId, Long roleId);
}
