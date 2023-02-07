package com.carrental.mailservice.model;

import lombok.Data;

import java.util.Set;

@Data
public class MultipleRecipientsMailsDTO {

    private Set<String> recipients;

    private String subject;

    private String text;
}
