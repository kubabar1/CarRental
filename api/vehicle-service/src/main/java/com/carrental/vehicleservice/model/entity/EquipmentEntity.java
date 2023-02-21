package com.carrental.vehicleservice.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name = "equipment")
@Table(name = "equipment")
public class EquipmentEntity implements Serializable {

    @Id
    @Column(name = "equipment_code", nullable = false, length = 3)
    private String equipmentCode;

    @Column(name = "description", nullable = false, length = 50)
    private String description;

    public EquipmentEntity() {
    }

    public EquipmentEntity(String equipmentCode, String description) {
        this.equipmentCode = equipmentCode;
        this.description = description;
    }
}
