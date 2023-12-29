package com.carrental.authservice.config.security;

import com.carrental.commons.authentication.config.jwt.JwtProperties;
import com.carrental.commons.authentication.model.AuthenticatedUser;
import com.carrental.commons.authentication.utils.JWTTokenUtils;
import com.google.common.net.HttpHeaders;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.session.SessionAuthenticationException;
import org.springframework.security.web.authentication.session.SessionAuthenticationStrategy;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

public class JwtSessionAuthenticationStrategy implements SessionAuthenticationStrategy {

    private final JwtProperties jwtProperties;

    public JwtSessionAuthenticationStrategy(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    }

    @Override
    public void onAuthentication(
        Authentication authentication,
        HttpServletRequest request,
        HttpServletResponse response
    ) throws SessionAuthenticationException {
        AuthenticatedUser user = (AuthenticatedUser) authentication.getPrincipal();
        response.addHeader(HttpHeaders.SET_COOKIE, JWTTokenUtils.getInstance().generateAuthCookie(
            jwtProperties.getCookieName(),
            jwtProperties.getCookiePath(),
            user,
            jwtProperties.getSecret(),
            jwtProperties.getExpirationInSeconds()
        ).toString());
    }
}
