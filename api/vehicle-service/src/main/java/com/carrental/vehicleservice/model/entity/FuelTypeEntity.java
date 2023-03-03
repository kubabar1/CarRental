package com.carrental.vehicleservice.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
@Entity(name = "fuel_types")
@Table(name = "fuel_types")
public class FuelTypeEntity implements Serializable {

    public static final String FUEL_TYPE = "fuelType";

    public FuelTypeEntity() {
    }

    public FuelTypeEntity(String fuelType) {
        this.fuelType = fuelType;
    }

    @Id
    @Column(name = "fuel_type", nullable = false, length = 50)
    private String fuelType;

    @OneToMany(mappedBy = "fuelType")
    private Set<VehicleDetailsEntity> vehicleDetails;
}
