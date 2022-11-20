package com.carrental.mailservice.service;

import com.carrental.mailservice.model.SendMailDTO;
import org.springframework.mail.SimpleMailMessage;

public interface MailService {

    SimpleMailMessage sendEmail(SendMailDTO sendMailDTO);
}
