package com.carrental.vehicleservice.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@Entity(name = "models")
@Table(name = "models")
public class ModelEntity implements Serializable {

    public static final String MODEL = "model";

    @Id
    @Column(name = "model", nullable = false, length = 50)
    private String model;

    @ManyToOne(cascade = {CascadeType.PERSIST})
    @JoinColumn(name = "brand", referencedColumnName = "brand", nullable = false)
    private BrandEntity brand;

    @OneToMany(mappedBy = "model")
    private Set<VehicleEntity> vehicles;
}
