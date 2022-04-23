package com.carrental.vehicleservice.model.entity;

import com.carrental.vehicleservice.model.constants.VehicleStatCodeEnum;
import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name = "vehicle_status")
@Table(name = "vehicle_status")
public class VehicleStatusEntity implements Serializable {

    @Id
    @Enumerated(EnumType.STRING)
    @Column(name = "vehicle_status_code", nullable = false, length = 3)
    private VehicleStatCodeEnum vehicleStatusCode;

    @Column(name = "description", nullable = false, length = 50)
    private String description;
}
