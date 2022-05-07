package com.carrental.ratingservice.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Table(name = "comments")
@Entity(name = "comments")
public class CommentEntity implements Serializable {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "content", nullable = false, length = 10000)
    private String content;

    @Column(name = "vehicle_id", nullable = false)
    private Long vehicleId;

    @Column(name = "user_id", nullable = false)
    private Long userId;

    @Column(name = "creation_date", nullable = false)
    private String creationDate;
}
