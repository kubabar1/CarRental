package com.carrental.ratingservice.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Table(name = "rates")
@Entity(name = "rates")
public class RateEntity implements Serializable {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "rate", nullable = false)
    private Long rate;

    @Column(name = "vehicle_id", nullable = false)
    private Long vehicleId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "creation_date", nullable = false)
    private String creationDate;
}
