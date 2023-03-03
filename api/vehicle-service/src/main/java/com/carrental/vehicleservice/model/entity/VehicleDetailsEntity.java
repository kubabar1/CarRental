package com.carrental.vehicleservice.model.entity;

import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import javax.validation.constraints.Min;
import java.io.Serializable;

@Getter
@Setter
@Entity(name = "vehicle_details")
@Table(name = "vehicle_details")
public class VehicleDetailsEntity implements Serializable {

    public static final String BODY_TYPE_FIELD = "bodyType";

    public static final String MODEL_FIELD = "model";

    public static final String COLOR_FIELD = "color";

    public static final String SEATS_NUMBER_FIELD = "seatsNumber";

    public static final String DOORS_NUMBER_FIELD = "doorsNumber";

    public static final String PRODUCTION_YEAR_FIELD = "productionYear";

    @Id
    @Column(name = "vehicle_id", nullable = false, unique = true)
    private Long vehicleId;

    @ManyToOne
    @JoinColumn(name = "body_type", nullable = false)
    private BodyTypeEntity bodyType;

    @Column(name = "production_year", nullable = false)
    @Min(value = 1900)
    private Integer productionYear;

    @ManyToOne
    @JoinColumn(name = "fuel_type", nullable = false)
    private FuelTypeEntity fuelType;

    @Column(name = "power", nullable = false)
    private Integer power;

    @Column(name = "gearbox", nullable = false, length = 50)
    private String gearbox;

    @Column(name = "front_wheel_drive", nullable = false)
    private boolean frontWheelDrive;

    @Column(name = "doors_number", nullable = false)
    private Integer doorsNumber;

    @Column(name = "seats_number", nullable = false)
    private Integer seatsNumber;

    @ManyToOne
    @JoinColumn(name = "color", nullable = false)
    private ColorEntity color;

    @Column(name = "metallic", nullable = false)
    private boolean metallic;

    @Column(name = "image_name", nullable = false, length = 70)
    private String imageName;

    @Column(name = "description", nullable = false, length = 255)
    private String description;

    @MapsId
    @OneToOne(fetch = FetchType.LAZY, cascade = {CascadeType.PERSIST, CascadeType.REMOVE})
    @JoinColumn(name = "vehicle_id", nullable = false)
    private VehicleEntity vehicle;
}
