package com.carrental.vehicleservice.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.OneToMany;
import javax.persistence.FetchType;
import java.io.Serializable;
import java.util.Set;

@Getter
@Setter
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

    @OneToMany(mappedBy = "color")
    private Set<VehicleDetailsEntity> vehicleDetails;
}
