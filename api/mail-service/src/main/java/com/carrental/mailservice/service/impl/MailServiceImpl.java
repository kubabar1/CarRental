package com.carrental.mailservice.service.impl;

import com.carrental.mailservice.model.SendMailDTO;
import com.carrental.mailservice.service.MailService;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;

public class MailServiceImpl implements MailService {

    private MailSender mailSender;

    public MailServiceImpl(MailSender mailSender) {
        this.mailSender = mailSender;
    }

    @Override
    public SimpleMailMessage sendEmail(SendMailDTO sendMailDTO) {
        SimpleMailMessage email = createMail(sendMailDTO);
        mailSender.send(email);
        return email;
    }

    private SimpleMailMessage createMail(SendMailDTO sendMailDTO) {
        SimpleMailMessage email = new SimpleMailMessage();
        email.setTo(sendMailDTO.getRecipient());
        email.setSubject(sendMailDTO.getSubject());
        email.setText(sendMailDTO.getText());
        return email;
    }
}
