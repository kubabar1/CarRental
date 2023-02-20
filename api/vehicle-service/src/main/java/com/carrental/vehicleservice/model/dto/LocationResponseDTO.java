package com.carrental.vehicleservice.model.dto;

import lombok.Data;

@Data
public class LocationResponseDTO {

  private Long id;

  private String country;

  private String city;

  private String streetAndNb;

  private String code;

  private String email;

  private String phone;
}
