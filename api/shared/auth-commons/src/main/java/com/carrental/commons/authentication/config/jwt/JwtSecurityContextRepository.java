package com.carrental.commons.authentication.config.jwt;

import com.carrental.commons.authentication.model.AuthenticatedUser;
import com.carrental.commons.authentication.utils.JWTTokenUtils;
import io.jsonwebtoken.JwtException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.security.web.context.HttpRequestResponseHolder;
import org.springframework.security.web.context.SecurityContextRepository;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Optional;

public class JwtSecurityContextRepository implements SecurityContextRepository {

    private final JwtProperties jwtProperties;

    public JwtSecurityContextRepository(JwtProperties jwtProperties) {
        this.jwtProperties = jwtProperties;
    }

    @Override
    public SecurityContext loadContext(HttpRequestResponseHolder requestResponseHolder) {
        Optional<String> jwtToken = JWTTokenUtils.getInstance().getTokenFromCookie(requestResponseHolder.getRequest(), jwtProperties.getCookieName());
        SecurityContext context = SecurityContextHolder.getContext();

        if (jwtToken.isEmpty()) {
            return context;
        }

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            try {
                AuthenticatedUser userDetails = JWTTokenUtils.getInstance()
                    .getAuthenticatedUserFromToken(jwtToken.get(), jwtProperties.getSecret());
                UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
                usernamePasswordAuthenticationToken.setDetails(
                    new WebAuthenticationDetailsSource().buildDetails(requestResponseHolder.getRequest()));
                context.setAuthentication(usernamePasswordAuthenticationToken);
            } catch (JwtException jwtException) {
                return context;
            }
        }
        return context;
    }

    // User information is stored in the JWT itself
    @Override
    public void saveContext(SecurityContext context, HttpServletRequest request, HttpServletResponse response) {
    }

    // boolean value denoting if the token exists in our request
    @Override
    public boolean containsContext(HttpServletRequest request) {
        return JWTTokenUtils.getInstance().getTokenFromCookie(request, jwtProperties.getCookieName()).isPresent();
    }
}
