package com.carrental.vehicleservice.model.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Entity(name = "body_types")
@Table(name = "body_types")
public class BodyTypeEntity implements Serializable {

    public static final String BODY_TYPE = "bodyType";

    public BodyTypeEntity() {
    }

    public BodyTypeEntity(String bodyType) {
        this.bodyType = bodyType;
    }

    @Id
    @Column(name = "body_type", nullable = false, length = 50)
    private String bodyType;
}
