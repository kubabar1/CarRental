package com.carrental.mailservice.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "mail")
public class MailServiceProperties {

    @NotNull
    private String demoRecipientAddress;

    @NotNull
    private String demoRecipientLogin;

    @NotNull
    private String demoRecipientPassword;

    @NotNull
    private String host;

    @NotNull
    private Integer port;

    @NotNull
    private String username;

    @NotNull
    private String password;

    public String getDemoRecipientAddress() {
        return demoRecipientAddress;
    }

    public void setDemoRecipientAddress(String demoRecipientAddress) {
        this.demoRecipientAddress = demoRecipientAddress;
    }

    public String getDemoRecipientLogin() {
        return demoRecipientLogin;
    }

    public void setDemoRecipientLogin(String demoRecipientLogin) {
        this.demoRecipientLogin = demoRecipientLogin;
    }

    public String getDemoRecipientPassword() {
        return demoRecipientPassword;
    }

    public void setDemoRecipientPassword(String demoRecipientPassword) {
        this.demoRecipientPassword = demoRecipientPassword;
    }

    public String getHost() {
        return host;
    }

    public void setHost(String host) {
        this.host = host;
    }

    public Integer getPort() {
        return port;
    }

    public void setPort(Integer port) {
        this.port = port;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }
}
