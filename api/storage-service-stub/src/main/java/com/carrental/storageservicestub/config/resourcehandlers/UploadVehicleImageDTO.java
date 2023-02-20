package com.carrental.storageservicestub.config.resourcehandlers;

import lombok.Data;

import java.io.Serializable;

@Data
public class UploadVehicleImageDTO implements Serializable {

    private String imageName;

    private byte[] imageFile;
}
