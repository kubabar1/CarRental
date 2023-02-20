package com.carrental.vehicleservice.model.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Data
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
}
