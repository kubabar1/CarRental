package com.carrental.authservice.event;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class OnRegistrationCompleteEvent extends ApplicationEvent {

    private Long userId;

    private String appUrl;

    private boolean isResendToken = false;

    public OnRegistrationCompleteEvent(Long userId, String appUrl, boolean isResendToken) {
        super(userId);
        this.userId = userId;
        this.appUrl = appUrl;
        this.isResendToken = isResendToken;
    }
}
