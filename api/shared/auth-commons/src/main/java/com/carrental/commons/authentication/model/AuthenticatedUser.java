package com.carrental.commons.authentication.model;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.Collection;

public class AuthenticatedUser implements UserDetails {

    private Long userId;

    private String name;

    private String surname;

    private String phone;

    private String birthDate;

    private Collection<? extends GrantedAuthority> authorities;

    private String email;

    private String password;

    private boolean enabled;

    private boolean isAccountNonExpired;

    private boolean credentialsNonExpired;

    private boolean isAccountNonLocked;

    public AuthenticatedUser(
            Long userId,
            String name,
            String surname,
            String phone,
            String birthDate,
            String email,
            String password,
            boolean enabled,
            boolean isAccountNonExpired,
            boolean credentialsNonExpired,
            boolean isAccountNonLocked,
            Collection<? extends GrantedAuthority> authorities
    ) {
        this.userId = userId;
        this.name = name;
        this.surname = surname;
        this.phone = phone;
        this.birthDate = birthDate;
        this.authorities = authorities;
        this.email = email;
        this.password = password;
        this.enabled = enabled;
        this.isAccountNonExpired = isAccountNonExpired;
        this.credentialsNonExpired = credentialsNonExpired;
        this.isAccountNonLocked = isAccountNonLocked;
    }

    @Override
    public String getUsername() {
        return email;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getSurname() {
        return surname;
    }

    public void setSurname(String surname) {
        this.surname = surname;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public String getBirthDate() {
        return birthDate;
    }

    public void setBirthDate(String birthDate) {
        this.birthDate = birthDate;
    }

    @Override
    public Collection<? extends GrantedAuthority> getAuthorities() {
        return authorities;
    }

    public void setAuthorities(Collection<? extends GrantedAuthority> authorities) {
        this.authorities = authorities;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public boolean isEnabled() {
        return enabled;
    }

    public void setEnabled(boolean enabled) {
        this.enabled = enabled;
    }
    @Override
    public boolean isCredentialsNonExpired() {
        return credentialsNonExpired;
    }

    public void setCredentialsNonExpired(boolean credentialsNonExpired) {
        this.credentialsNonExpired = credentialsNonExpired;
    }

    @Override
    public boolean isAccountNonExpired() {
        return isAccountNonExpired;
    }

    @Override
    public boolean isAccountNonLocked() {
        return isAccountNonLocked;
    }
}
