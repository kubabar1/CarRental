package com.carrental.controller;

import java.util.Collections;
import java.util.Map;

import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping(value = { "/userdata" })
public class SecurityController {

	@RequestMapping(value = "/username", method = RequestMethod.GET)
	public Map<String, String> currentUserName(Authentication authentication) {
		if(authentication!=null && authentication.isAuthenticated()) {
			return Collections.singletonMap("username", authentication.getName());
		}else {
			return Collections.singletonMap("username", "no_authenticated_user");
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
