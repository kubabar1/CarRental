package com.carrental.mailservice.listener;

import com.carrental.mailservice.model.MailDTO;
import com.carrental.mailservice.model.MultipleRecipientsMailsDTO;
import com.carrental.mailservice.service.MailService;
import org.springframework.amqp.rabbit.annotation.RabbitListener;

public class SendEmailListener {

    private final MailService mailService;

    public SendEmailListener(MailService mailService) {
        this.mailService = mailService;
    }

    @RabbitListener(queues = {"sendEmailQueue"})
    public void sendEmail(MailDTO mailDTO) {
        mailService.sendEmail(mailDTO);
    }

    @RabbitListener(queues = {"sendMultipleEmailsQueue"})
    public void sendMultipleRecipientsMails(MultipleRecipientsMailsDTO multipleRecipientsMailsDTO) {
        mailService.sendMultipleRecipientsMails(multipleRecipientsMailsDTO);
    }
}
