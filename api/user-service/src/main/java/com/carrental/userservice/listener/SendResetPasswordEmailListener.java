package com.carrental.userservice.listener;

import com.carrental.commons.authentication.model.VerificationTokenDTO;
import com.carrental.userservice.config.properties.UserServiceProperties;
import com.carrental.userservice.model.dto.MailDTO;
import com.carrental.userservice.model.dto.TokenRequestDTO;
import com.carrental.userservice.model.event.OnSendResetPasswordEmailEvent;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.context.ApplicationListener;
import org.springframework.core.ParameterizedTypeReference;

public class SendResetPasswordEmailListener implements ApplicationListener<OnSendResetPasswordEmailEvent> {

    private final RabbitTemplate rabbitTemplate;

    private final UserServiceProperties userServiceProperties;

    public SendResetPasswordEmailListener(RabbitTemplate rabbitTemplate, UserServiceProperties userServiceProperties) {
        this.rabbitTemplate = rabbitTemplate;
        this.userServiceProperties = userServiceProperties;
    }

    @Override
    public void onApplicationEvent(OnSendResetPasswordEmailEvent event) {
        VerificationTokenDTO verificationToken = rabbitTemplate.convertSendAndReceiveAsType(
            userServiceProperties.getGenerateTokenQueue(),
            new TokenRequestDTO(event.getUserId()),
            new ParameterizedTypeReference<>() {}
        );

        if (verificationToken != null) {
            rabbitTemplate.convertAndSend(
                userServiceProperties.getSendEmailQueue(),
                createConfirmPasswordResetMailText(event.getUserEmail(), verificationToken.getToken())
            );
        }
    }

    private MailDTO createConfirmPasswordResetMailText(String recipientAddress, String token) {
        MailDTO mailDTO = new MailDTO();
        mailDTO.setRecipient(recipientAddress);
        mailDTO.setSubject("Password Reset Confirmation");
        mailDTO.setText("Click below link to change your password.\n"
                + userServiceProperties.getResetPasswordChangePasswordUrl()
                + token);
        return mailDTO;
    }
}
