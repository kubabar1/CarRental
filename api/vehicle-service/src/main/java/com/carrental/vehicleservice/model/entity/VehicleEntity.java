package com.carrental.vehicleservice.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;

@Data
@Entity(name = "vehicles")
@Table(name = "vehicles")
public class VehicleEntity implements Serializable {

    @Id
    @Column(name = "id", nullable = false)
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long id;

    @Column(name = "registration", nullable = false, length = 20, unique = true)
    private String registration;

    @Column(name = "brand", nullable = false, length = 50)
    private String brand;

    @Column(name = "model", nullable = false, length = 50)
    private String model;

    @Column(name = "daily_fee", nullable = false)
    private BigDecimal dailyFee;

    @Column(name = "location_id", nullable = false)
    private Long locationId;

    @Column(name = "best_offer", nullable = false)
    private boolean bestOffer;

    @ManyToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "vehicle_status_code", referencedColumnName = "vehicle_status_code", nullable = false)
    private VehicleStatusEntity vehicleStatus;

    @OneToOne(cascade = CascadeType.ALL)
    @JoinColumn(name = "id", nullable = false)
    private VehicleDetailsEntity vehicleDetails;

    @ManyToMany
    @JoinTable(
            name = "eqp",
            joinColumns = @JoinColumn(name = "vehicle_id"),
            inverseJoinColumns = @JoinColumn(name = "equipment_id"))
    private Set<EquipmentEntity> equipments;
}
