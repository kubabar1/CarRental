package com.carrental.vehicleservice.model.entity;

import lombok.Data;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import java.io.Serializable;

@Data
@Entity(name = "colors")
@Table(name = "colors")
public class ColorEntity implements Serializable {

    public static final String COLOR = "color";

    public ColorEntity() {
    }

    public ColorEntity(String color) {
        this.color = color;
    }

    @Id
    @Column(name = "color", nullable = false, length = 50)
    private String color;
}
