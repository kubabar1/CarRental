package com.carrental.authservice.service.impl;


import com.carrental.authservice.config.EmbeddedUsersDBStub;
import com.carrental.authservice.model.dto.UserResponseDTO;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

public class UserDetailsServiceImpl implements UserDetailsService {

    private final EmbeddedUsersDBStub embeddedUsersDBStub;

    public UserDetailsServiceImpl(EmbeddedUsersDBStub embeddedUsersDBStub) {
        this.embeddedUsersDBStub = embeddedUsersDBStub;
    }

    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserResponseDTO user = embeddedUsersDBStub.getUserByUsername(username);

        if (user == null) {
            throw new UsernameNotFoundException("No user found with username: " + username);
        }

        boolean enabled = true;
        boolean accountNonExpired = true;
        boolean credentialsNonExpired = true;
        boolean accountNonLocked = true;

        List<String> roles = new ArrayList<>();

        return new org.springframework.security.core.userdetails.User(
                username, "qwerty", enabled, accountNonExpired,
                credentialsNonExpired, accountNonLocked, getAuthorities(roles));
    }

    private static List<GrantedAuthority> getAuthorities (List<String> roles) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (String role : roles) {
            authorities.add(new SimpleGrantedAuthority(role));
        }
        return authorities;
    }
}
