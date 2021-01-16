package com.carrental.config;

import com.carrental.model.User;
import com.carrental.model.UserRole;
import com.carrental.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Service("customUserDetailsService")
public class CustomUserDetailsService implements UserDetailsService {

  @Autowired private UserService userService;

  @Transactional
  @Override
  public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
    User user = userService.getUserByLogin(username);

    if (user != null) {
      List<GrantedAuthority> authorities = new ArrayList<GrantedAuthority>();
      Set<UserRole> userRoles = user.getUserRolesList();
      for (UserRole ur : userRoles) {
        authorities.add(new SimpleGrantedAuthority("ROLE_" + ur.getType()));
      }

      return new org.springframework.security.core.userdetails.User(
          user.getLogin(), user.getPassword(), authorities);
    }
    throw new UsernameNotFoundException("Username not found");
  }
}
