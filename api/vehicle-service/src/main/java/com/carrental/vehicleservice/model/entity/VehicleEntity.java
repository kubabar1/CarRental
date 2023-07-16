package com.carrental.vehicleservice.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.io.Serializable;
import java.math.BigDecimal;
import java.util.Set;

@Getter
@Setter
@Entity(name = "vehicles")
@Table(name = "vehicles")
public class VehicleEntity implements Serializable {

    public static final String BRAND_FIELD = "brand";

    public static final String DAILY_FEE_FIELD = "dailyFee";

    public static final String VEHICLE_DETAILS_FIELD = "vehicleDetails";

    @Id
    @Column(name = "id", nullable = false, unique = true)
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "registration", nullable = false, length = 20, unique = true)
    private String registration;

    @ManyToOne
    @JoinColumn(name = "brand", nullable = false)
    private BrandEntity brand;

    @ManyToOne
    @JoinColumn(name = "model", nullable = false)
    private ModelEntity model;

    @Column(name = "daily_fee", nullable = false)
    private BigDecimal dailyFee;

    @Column(name = "location_id", nullable = false)
    private Long locationId;

    @Column(name = "best_offer", nullable = false)
    private boolean bestOffer;

    @OneToOne(cascade = CascadeType.PERSIST, mappedBy = "vehicle")
    @JoinColumn(name = "id", nullable = false)
    private VehicleDetailsEntity vehicleDetails;

    @ManyToMany
    @JoinTable(
            name = "eqp",
            joinColumns = @JoinColumn(name = "vehicle_id"),
            inverseJoinColumns = @JoinColumn(name = "equipment_id"))
    private Set<EquipmentEntity> equipments;

    public void setVehicleDetails(VehicleDetailsEntity vehicleDetails) {
        this.vehicleDetails = vehicleDetails;
        this.vehicleDetails.setVehicle(this);
    }
}
