package com.carrental.vehicleservice.model.entity;

import lombok.Data;

import javax.persistence.*;

@Data
@Entity(name = "models")
@Table(name = "models")
public class ModelEntity {

    public static final String MODEL = "model";

    @Id
    @Column(name = "model", nullable = false, length = 50)
    private String model;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "brand", referencedColumnName = "brand", nullable = false)
    private BrandEntity brand;
}
