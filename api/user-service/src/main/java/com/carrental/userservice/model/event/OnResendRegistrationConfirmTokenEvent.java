package com.carrental.userservice.model.event;

import lombok.Getter;
import lombok.Setter;
import org.springframework.context.ApplicationEvent;

@Getter
@Setter
public class OnResendRegistrationConfirmTokenEvent extends ApplicationEvent {

    private Long userId;

    private String userEmail;

    public OnResendRegistrationConfirmTokenEvent(Object source, Long userId, String userEmail) {
        super(source);
        this.userId = userId;
        this.userEmail = userEmail;
    }
}
