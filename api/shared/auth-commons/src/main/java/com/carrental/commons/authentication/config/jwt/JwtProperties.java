package com.carrental.commons.authentication.config.jwt;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "jwt")
public class JwtProperties {

    @NotNull
    private String secret;

    @NotNull
    private Long expirationInSeconds;

    @NotNull
    private String cookieName;

    @NotNull
    private String cookiePath;

    public String getSecret() {
        return secret;
    }

    public void setSecret(String secret) {
        this.secret = secret;
    }

    public Long getExpirationInSeconds() {
        return expirationInSeconds;
    }

    public void setExpirationInSeconds(Long expirationInSeconds) {
        this.expirationInSeconds = expirationInSeconds;
    }

    public String getCookieName() {
        return cookieName;
    }

    public void setCookieName(String cookieName) {
        this.cookieName = cookieName;
    }

    public String getCookiePath() {
        return cookiePath;
    }

    public void setCookiePath(String cookiePath) {
        this.cookiePath = cookiePath;
    }
}
