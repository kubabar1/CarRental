package com.carrental.controller;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.carrental.model.User;
import com.carrental.service.UserService;
import com.carrental.service.UserServiceImpl;

@RestController
@RequestMapping(value = { "/userdata" })
public class SecurityController {

	@Autowired
	UserServiceImpl userService;
	
	@RequestMapping(value = "/username", method = RequestMethod.GET)
	public Map<String, String> currentUserName(Authentication authentication) {
		if(authentication!=null && authentication.isAuthenticated()) {
			return Collections.singletonMap("username", authentication.getName());
		}else {
			return Collections.singletonMap("username", null);
		}
	}
	
	@RequestMapping(value = "/all", method = RequestMethod.GET)
	public User currentUserData(Authentication authentication) {
		if(authentication!=null && authentication.isAuthenticated()) {
			return userService.getUserByLogin(authentication.getName());
		}else {
			return null;
		}
	}
	
	@RequestMapping(value = "/userroles", method = RequestMethod.GET)
	public Map<String, String[]> currentUserRole(Authentication authentication) {
		if(authentication!=null && authentication.isAuthenticated()) {
			List<String> rolesList = new ArrayList<>();
			for(GrantedAuthority g : authentication.getAuthorities()) {
				rolesList.add(g.getAuthority());
			}
			return Collections.singletonMap("userroles", rolesList.toArray(new String[0]));
		}else {
			return Collections.singletonMap("userroles", null);
		}
	}

	@RequestMapping(value = "/isauthenticated", method = RequestMethod.GET)
	public Map<String, Boolean> checkIfUserIsAuthenticated(Authentication authentication) {
		if(authentication!=null && authentication.isAuthenticated()) {
			System.out.println(authentication.getName());
			System.out.println(authentication.getAuthorities().toString());
			return Collections.singletonMap("isAuthenticated", true);
		}else {
			return Collections.singletonMap("isAuthenticated", false);
		}
	}
}
