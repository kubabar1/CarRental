package com.carrental.commons.authentication.service;

import com.carrental.commons.authentication.exception.AuthorizationException;
import com.carrental.commons.authentication.model.AuthenticatedUser;
import com.carrental.commons.authentication.model.AuthenticatedUserDTO;

public interface AuthenticatedUserDataService {

    AuthenticatedUser getAuthenticatedUserData() throws AuthorizationException;

}
