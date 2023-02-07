package com.carrental.mailservice.service;

import com.carrental.mailservice.model.MailDTO;
import com.carrental.mailservice.model.MultipleRecipientsMailsDTO;

public interface MailService {

    void sendEmail(MailDTO mailDTO);

    void sendMultipleRecipientsMails(MultipleRecipientsMailsDTO multipleRecipientsMailsDTO);
}
