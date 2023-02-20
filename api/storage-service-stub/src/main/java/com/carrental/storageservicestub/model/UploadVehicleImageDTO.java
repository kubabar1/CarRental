package com.carrental.storageservicestub.model;

import lombok.Data;

import java.io.File;

@Data
public class UploadVehicleImageDTO {

    private String imageName;

    private byte[] imageFile;
}
