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
    public AuthenticatedUserDTO getAuthenticatedUserData() throws AuthorizationException {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        AuthenticatedUserDTO authenticatedUserDTO = new AuthenticatedUserDTO();

        if (!(authentication instanceof AnonymousAuthenticationToken) && principal instanceof AuthenticatedUser) {
            AuthenticatedUser userDetails = (AuthenticatedUser) principal;
            authenticatedUserDTO.setId(userDetails.getUserId());
            authenticatedUserDTO.setEmail(userDetails.getEmail());
            authenticatedUserDTO.setAuthenticated(true);
            authenticatedUserDTO.setName(userDetails.getName());
            authenticatedUserDTO.setSurname(userDetails.getSurname());
            authenticatedUserDTO.setPhone(userDetails.getPhone());
            authenticatedUserDTO.setBirthDate(userDetails.getBirthDate());
            authenticatedUserDTO.setUserRoles(userDetails.getAuthorities().stream().map(GrantedAuthority::getAuthority).collect(Collectors.toList()));
        } else {
            authenticatedUserDTO.setAuthenticated(false);
        }

        return authenticatedUserDTO;
    }
}
