package com.carrental.vehicleservice.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name = "vehicle_details")
@Table(name = "vehicle_details")
public class VehicleDetailsEntity implements Serializable {

    public static final String BODY_TYPE_FIELD = "bodyType";

    public static final String COLOR_FIELD = "color";

    public static final String SEATS_NUMBER_FIELD = "seatsNumber";

    public static final String DOORS_NUMBER_FIELD = "doorsNumber";

    public static final String PRODUCTION_YEAR_FIELD = "productionYear";

    @Id
    @Column(name = "vehicle_id", nullable = false, unique = true)
    private Long vehicleId;

    @Column(name = "body_type", nullable = false, length = 30)
    private String bodyType;

    @Column(name = "production_year", nullable = false)
    private Integer productionYear;

    @Column(name = "fuel_type", nullable = false, length = 30)
    private String fuelType;

    @Column(name = "power", nullable = false)
    private Integer power;

    @Column(name = "gearbox", nullable = false, length = 30)
    private String gearbox;

    @Column(name = "front_wheel_drive", nullable = false)
    private boolean frontWheelDrive;

    @Column(name = "doors_number", nullable = false)
    private Integer doorsNumber;

    @Column(name = "seats_number", nullable = false)
    private Integer seatsNumber;

    @Column(name = "color", nullable = false, length = 30)
    private String color;

    @Column(name = "metallic", nullable = false)
    private boolean metallic;

    @Column(name = "photo_name", nullable = false, length = 70)
    private String photoName;

    @Column(name = "description", nullable = false, length = 100)
    private String description;
}
