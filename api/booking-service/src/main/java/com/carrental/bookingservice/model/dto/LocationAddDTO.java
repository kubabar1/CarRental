package com.carrental.bookingservice.model.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class LocationAddDTO {

    @NotEmpty
    @Size(max = 50)
    private String country;

    @NotEmpty
    @Size(max = 150)
    private String city;

    @NotEmpty
    @Size(max = 150)
    private String streetAndNb;

    @NotEmpty
    @Size(max = 20)
    private String code;

    @NotEmpty
    @Size(max = 255)
    private String email;

    @NotEmpty
    @Size(max = 30)
    private String phone;
}
