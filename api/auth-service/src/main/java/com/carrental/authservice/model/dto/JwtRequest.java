package com.carrental.authservice.model.dto;

import javax.validation.constraints.NotNull;
import java.io.Serializable;

public class JwtRequest implements Serializable {

    @NotNull
    private String username;

    @NotNull
    private String password;

    public JwtRequest() {}

    public JwtRequest(String username, String password) {
        this.setUsername(username);
        this.setPassword(password);
    }

    public String getUsername() {
        return this.username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return this.password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}