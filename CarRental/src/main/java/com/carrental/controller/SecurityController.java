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
		return Collections.singletonMap("username", authentication.getName());
	}

	@RequestMapping(value = "/isauthenticated", method = RequestMethod.GET)
	public Map<String, Boolean> checkIfUserIsAuthenticated(Authentication authentication) {
		if(authentication!=null && authentication.isAuthenticated()) {
			return Collections.singletonMap("isAuthenticated", true);
		}else {
			return Collections.singletonMap("isAuthenticated", false);
		}
	}
}
