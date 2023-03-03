package com.carrental.vehicleservice.model.entity;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
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

    @OneToMany(mappedBy = "bodyType")
    private Set<VehicleDetailsEntity> vehicleDetails;
}
