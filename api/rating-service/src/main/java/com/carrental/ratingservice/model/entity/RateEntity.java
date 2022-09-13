package com.carrental.ratingservice.model.entity;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;
import java.util.Date;

@Data
@Table(name = "rates")
@Entity(name = "rates")
public class RateEntity implements Serializable {

    @Id
    @Column(name = "id", nullable = false)
    @GenericGenerator(name="kaugen" , strategy="increment")
    @GeneratedValue(generator="kaugen")


    private Long id;

    @Column(name = "rate", nullable = false)
    private Integer rate;

    @Column(name = "vehicle_id", nullable = false)
    private Long vehicleId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;
//
//    @MapsId
//    @OneToOne(mappedBy = "rate")
//    @JoinColumn(name = "id")
//    private CommentEntity commentEntity;
}
