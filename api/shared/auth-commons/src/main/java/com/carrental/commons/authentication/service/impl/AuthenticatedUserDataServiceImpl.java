package com.carrental.commons.authentication.service.impl;

import com.carrental.commons.authentication.exception.AuthorizationException;
import com.carrental.commons.authentication.model.AuthenticatedUser;
import com.carrental.commons.authentication.model.AuthenticatedUserDTO;
import com.carrental.commons.authentication.service.AuthenticatedUserDataService;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.context.SecurityContextHolder;

import java.util.stream.Collectors;

public class AuthenticatedUserDataServiceImpl implements AuthenticatedUserDataService {

    @Override
    public AuthenticatedUser getAuthenticatedUserData() throws AuthorizationException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();

        if (!(authentication instanceof AnonymousAuthenticationToken) && principal instanceof AuthenticatedUser) {
            return (AuthenticatedUser) principal;
        }

        return null;
    }
}
