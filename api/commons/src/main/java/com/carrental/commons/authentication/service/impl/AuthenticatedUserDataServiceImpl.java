package com.carrental.commons.authentication.service.impl;

import com.carrental.commons.authentication.exception.AuthorizationException;
import com.carrental.commons.authentication.model.AuthenticatedUserData;
import com.carrental.commons.authentication.service.AuthenticatedUserDataService;

public class AuthenticatedUserDataServiceImpl implements AuthenticatedUserDataService {

    @Override
    public AuthenticatedUserData getAuthenticatedUserData() throws AuthorizationException {
        AuthenticatedUserData authenticatedUserDTO = new AuthenticatedUserData();
        authenticatedUserDTO.setId(1L);
        return authenticatedUserDTO;
    }
}
