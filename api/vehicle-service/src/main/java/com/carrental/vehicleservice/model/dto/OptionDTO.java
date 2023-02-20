package com.carrental.vehicleservice.model.dto;

import lombok.Data;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Size;

@Data
public class OptionDTO {

    @NotEmpty
    @Size(max = 50)
    private String value;

    public OptionDTO() {
    }

    public OptionDTO(@NotEmpty @Size(max = 50) String value) {
        this.value = value;
    }
}
