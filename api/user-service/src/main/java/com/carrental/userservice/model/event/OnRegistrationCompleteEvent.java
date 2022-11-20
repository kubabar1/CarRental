package com.carrental.userservice.model.event;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class OnRegistrationCompleteEvent extends ApplicationEvent {

    private Long userId;

    private boolean isResendToken;

    public OnRegistrationCompleteEvent(Object source, Long userId, boolean isResendToken) {
        super(source);
        this.userId = userId;
        this.isResendToken = isResendToken;
    }
}
