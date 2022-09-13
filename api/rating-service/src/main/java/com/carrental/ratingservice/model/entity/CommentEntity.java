package com.carrental.ratingservice.model.entity;

import lombok.Data;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.io.Serializable;
import java.time.LocalDateTime;

@Data
@Table(name = "comments")
@Entity(name = "comments")
public class CommentEntity implements Serializable {

    @Id
    @Column(name = "id", nullable = false)
    @GenericGenerator(name="kaugen" , strategy="increment")
    @GeneratedValue(generator="kaugen")
    private Long id;

    @Column(name = "content", nullable = false, length = 10000)
    private String content;

    @Column(name = "vehicle_id", nullable = false)
    private Long vehicleId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "creation_date", nullable = false)
    private LocalDateTime creationDate;

    @JoinColumn(name = "rate_id", unique = true)
    @OneToOne(cascade = CascadeType.ALL)
    private RateEntity rate;
}
