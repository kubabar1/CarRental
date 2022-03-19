package com.carrental.bookingservice.model.entity;

import lombok.Data;

import javax.persistence.*;
import java.io.Serializable;

@Data
@Entity(name = "locations")
@Table(name = "Locations")
public class LocationEntity implements Serializable {

  @Id
  @Column(name = "ID", nullable = false)
  @GeneratedValue(strategy = GenerationType.AUTO)
  private Long id;

  @Column(name = "country", nullable = false, length = 50)
  private String country;

  @Column(name = "city", nullable = false, length = 150)
  private String city;

  @Column(name = "streetAndNb", nullable = false, length = 150)
  private String streetAndNb;

  @Column(name = "code", nullable = false, length = 20)
  private String code;

  @Column(name = "email", nullable = false, length = 255)
  private String email;

  @Column(name = "phone", nullable = false, length = 30)
  private String phone;
}
