package com.carrental.vehicleservice.model.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Data
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
}
