package com.carrental.bookingservice.model.entity;

import org.hibernate.envers.RevisionEntity;
import org.hibernate.envers.RevisionNumber;
import org.hibernate.envers.RevisionTimestamp;

import javax.persistence.*;

@Entity
@RevisionEntity
@Table(name = "revinfo")
public class Revision {

    @Id
    @GeneratedValue(strategy = GenerationType.SEQUENCE)
    @Column(nullable = false, name = "rev")
    @RevisionNumber
    private long rev;

    @Column(name = "revtstmp")
    @RevisionTimestamp
    private long timestamp;
}
