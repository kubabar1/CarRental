package com.carrental.commons.authentication.config.jwt;

import com.carrental.commons.authentication.model.AuthenticatedUser;
import com.carrental.commons.authentication.utils.JWTTokenUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.WebAuthenticationDetailsSource;
import org.springframework.util.ObjectUtils;
import org.springframework.web.filter.OncePerRequestFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

public class JwtRequestFilter extends OncePerRequestFilter {

    private final String secret;

    public JwtRequestFilter(String secret) {
        this.secret = secret;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain chain) throws ServletException, IOException {
        final String tokenAuthHeader = request.getHeader(HttpHeaders.AUTHORIZATION);

        if (ObjectUtils.isEmpty(tokenAuthHeader) || !tokenAuthHeader.startsWith("Bearer ")) {
            chain.doFilter(request, response);
            return;
        }

        final String jwtToken = tokenAuthHeader.substring(7).trim();
        final String username = getUsernameFromToken(jwtToken);
        if (username == null) {
            chain.doFilter(request, response);
            return;
        }

        if (SecurityContextHolder.getContext().getAuthentication() == null) {
            AuthenticatedUser userDetails = JWTTokenUtils.getInstance().getAuthenticatedUserFromToken(jwtToken, secret);

            UsernamePasswordAuthenticationToken usernamePasswordAuthenticationToken =
                    new UsernamePasswordAuthenticationToken(userDetails, null, userDetails.getAuthorities());
            usernamePasswordAuthenticationToken.setDetails(new WebAuthenticationDetailsSource().buildDetails(request));

            SecurityContextHolder.getContext().setAuthentication(usernamePasswordAuthenticationToken);
        }
        chain.doFilter(request, response);
    }

    private String getUsernameFromToken(String jwtToken) {
        try {
            return JWTTokenUtils.getInstance().getUsernameFromToken(jwtToken, secret);
        } catch (Exception e) {
            System.out.println("Unable to get JWT Token");
            return null;
        }
    }
}
