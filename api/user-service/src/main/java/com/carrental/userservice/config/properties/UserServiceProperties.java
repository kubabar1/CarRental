package com.carrental.userservice.config.properties;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.validation.annotation.Validated;

import javax.validation.constraints.NotNull;

@Validated
@ConfigurationProperties(prefix = "car-rental.user-service")
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

    @NotNull
    private String generateTokenQueue;

    @NotNull
    private String getTokenQueue;

    @NotNull
    private String deleteTokenQueue;

    @NotNull
    private String sendEmailQueue;

    @NotNull
    private String sendMultipleEmailsQueue;

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

    public String getGenerateTokenQueue() {
        return generateTokenQueue;
    }

    public void setGenerateTokenQueue(String generateTokenQueue) {
        this.generateTokenQueue = generateTokenQueue;
    }

    public String getGetTokenQueue() {
        return getTokenQueue;
    }

    public void setGetTokenQueue(String getTokenQueue) {
        this.getTokenQueue = getTokenQueue;
    }

    public String getDeleteTokenQueue() {
        return deleteTokenQueue;
    }

    public void setDeleteTokenQueue(String deleteTokenQueue) {
        this.deleteTokenQueue = deleteTokenQueue;
    }

    public String getSendEmailQueue() {
        return sendEmailQueue;
    }

    public void setSendEmailQueue(String sendEmailQueue) {
        this.sendEmailQueue = sendEmailQueue;
    }

    public String getSendMultipleEmailsQueue() {
        return sendMultipleEmailsQueue;
    }

    public void setSendMultipleEmailsQueue(String sendMultipleEmailsQueue) {
        this.sendMultipleEmailsQueue = sendMultipleEmailsQueue;
    }
}
