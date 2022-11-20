package com.carrental.mailservice.model;

import lombok.Data;

import java.io.Serializable;

@Data
public class SendMailDTO implements Serializable {

    private String recipient;

    private String subject;

    private String text;
}
