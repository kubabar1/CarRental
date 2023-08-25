package com.carrental.userservice.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "user-service")
public class UserServiceProperties {

    @NotNull
    private String registrationConfirmMailUrl;

    @NotNull
    private String registrationInvalidTokenUrl;

    @NotNull
    private String loginPageUrl;

    @NotNull
    private String resetPasswordInvalidTokenUrl;

    @NotNull
    private String registrationExpiredTokenUrl;

    @NotNull
    private String resetPasswordUpdateTokenUrl;

    @NotNull
    private String registrationConfirmUrl;

    @NotNull
    private String resetPasswordChangePasswordUrl;

    public String getRegistrationConfirmMailUrl() {
        return registrationConfirmMailUrl;
    }

    public void setRegistrationConfirmMailUrl(String registrationConfirmMailUrl) {
        this.registrationConfirmMailUrl = registrationConfirmMailUrl;
    }

    public String getRegistrationInvalidTokenUrl() {
        return registrationInvalidTokenUrl;
    }

    public void setRegistrationInvalidTokenUrl(String registrationInvalidTokenUrl) {
        this.registrationInvalidTokenUrl = registrationInvalidTokenUrl;
    }

    public String getLoginPageUrl() {
        return loginPageUrl;
    }

    public void setLoginPageUrl(String loginPageUrl) {
        this.loginPageUrl = loginPageUrl;
    }

    public String getResetPasswordInvalidTokenUrl() {
        return resetPasswordInvalidTokenUrl;
    }

    public void setResetPasswordInvalidTokenUrl(String resetPasswordInvalidTokenUrl) {
        this.resetPasswordInvalidTokenUrl = resetPasswordInvalidTokenUrl;
    }

    public String getRegistrationExpiredTokenUrl() {
        return registrationExpiredTokenUrl;
    }

    public void setRegistrationExpiredTokenUrl(String registrationExpiredTokenUrl) {
        this.registrationExpiredTokenUrl = registrationExpiredTokenUrl;
    }

    public String getResetPasswordUpdateTokenUrl() {
        return resetPasswordUpdateTokenUrl;
    }

    public void setResetPasswordUpdateTokenUrl(String resetPasswordUpdateTokenUrl) {
        this.resetPasswordUpdateTokenUrl = resetPasswordUpdateTokenUrl;
    }

    public String getRegistrationConfirmUrl() {
        return registrationConfirmUrl;
    }

    public void setRegistrationConfirmUrl(String registrationConfirmUrl) {
        this.registrationConfirmUrl = registrationConfirmUrl;
    }

    public String getResetPasswordChangePasswordUrl() {
        return resetPasswordChangePasswordUrl;
    }

    public void setResetPasswordChangePasswordUrl(String resetPasswordChangePasswordUrl) {
        this.resetPasswordChangePasswordUrl = resetPasswordChangePasswordUrl;
    }
}