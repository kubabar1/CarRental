package com.carrental.authservice.service.impl;


import com.carrental.authservice.config.properties.AuthServiceProperties;
import com.carrental.authservice.model.dto.UserDetailsDTO;
import com.carrental.authservice.model.dto.UserRoleResponseDTO;
import com.carrental.commons.authentication.model.AuthenticatedUser;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;

import java.util.ArrayList;
import java.util.List;

public class UserDetailsServiceImpl implements UserDetailsService {

    private final RabbitTemplate rabbitTemplate;

    private final AuthServiceProperties authServiceProperties;

    public UserDetailsServiceImpl(RabbitTemplate rabbitTemplate, AuthServiceProperties authServiceProperties) {
        this.rabbitTemplate = rabbitTemplate;
        this.authServiceProperties = authServiceProperties;
    }

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        UserDetailsDTO user = rabbitTemplate.convertSendAndReceiveAsType(
                authServiceProperties.getGetUserByEmailQueue(), email, new ParameterizedTypeReference<>() {
                });

        if (user == null) {
            throw new UsernameNotFoundException("No user found with email: " + email);
        }

        boolean enabled = user.isEnabled();
        boolean accountNonExpired = true;
        boolean credentialsNonExpired = true;
        boolean accountNonLocked = true;

        return new AuthenticatedUser(user.getId(), user.getName(), user.getSurname(), user.getPhone(),
                user.getBirthDate(), email, user.getPassword(), enabled, accountNonExpired, credentialsNonExpired,
                accountNonLocked, getAuthorities(user.getRoles()));
    }

    private static List<GrantedAuthority> getAuthorities(List<UserRoleResponseDTO> roles) {
        List<GrantedAuthority> authorities = new ArrayList<>();
        for (UserRoleResponseDTO role : roles) {
            authorities.add(new SimpleGrantedAuthority(role.getType()));
        }
        return authorities;
    }
}
