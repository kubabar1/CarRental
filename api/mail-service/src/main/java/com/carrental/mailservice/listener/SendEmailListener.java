package com.carrental.mailservice.listener;

import com.carrental.mailservice.model.MailDTO;
import com.carrental.mailservice.model.MultipleRecipientsMailsDTO;
import com.carrental.mailservice.service.MailService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.messaging.handler.annotation.Payload;

public class SendEmailListener {

    private final MailService mailService;

    public SendEmailListener(MailService mailService) {
        this.mailService = mailService;
    }

    @RabbitListener(queues = {"${car-rental.mail-service.queue.sendEmailQueue}"})
    public void sendEmail(@Payload MailDTO mailDTO) {
        mailService.sendEmail(mailDTO);
    }

    @RabbitListener(queues = {"${car-rental.mail-service.queue.sendMultipleEmailsQueue}"})
    public void sendMultipleRecipientsMails(@Payload MultipleRecipientsMailsDTO multipleRecipientsMailsDTO) {
        mailService.sendMultipleRecipientsMails(multipleRecipientsMailsDTO);
    }
}
