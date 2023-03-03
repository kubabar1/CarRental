package com.carrental.vehicleservice.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@Entity(name = "brands")
@Table(name = "brands")
public class BrandEntity implements Serializable {

    public static final String BRAND = "brand";

    public BrandEntity() {
    }

    public BrandEntity(String brand) {
        this.brand = brand;
    }

    @Id
    @Column(name = "brand", nullable = false, length = 50)
    private String brand;

    @OneToMany(mappedBy = "brand")
    private Set<VehicleEntity> vehicles;
}
