package com.carrental.commons.authentication.service;

import com.carrental.commons.authentication.exception.AuthorizationException;
import com.carrental.commons.authentication.model.AuthenticatedUserData;

public interface AuthenticatedUserDataService {

    AuthenticatedUserData getAuthenticatedUserData() throws AuthorizationException;

}
