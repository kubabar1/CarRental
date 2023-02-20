package com.carrental.vehicleservice.model.dto;

import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.io.Serializable;

@Data
public class UploadVehicleImageDTO implements Serializable {

    private String imageName;

    private byte[] imageFile;
}
