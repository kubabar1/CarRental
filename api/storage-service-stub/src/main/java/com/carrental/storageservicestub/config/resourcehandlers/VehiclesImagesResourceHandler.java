package com.carrental.storageservicestub.config.resourcehandlers;

import com.carrental.storageservicestub.model.BaseTmpDir;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.*;
import java.nio.file.Files;
import java.util.Set;

import static com.carrental.commons.utils.ZipUtils.unzipFile;

public class VehiclesImagesResourceHandler implements WebMvcConfigurer {

    private final BaseTmpDir baseTmpDir;

    public VehiclesImagesResourceHandler(BaseTmpDir baseTmpDir) {
        this.baseTmpDir = baseTmpDir;
    }

    @RabbitListener(queues = {"uploadVehicleImageQueue"})
    public void getLocationListener(UploadVehicleImageDTO uploadVehicleImageDTO) {
        try {
            File vehicleImagesDir = new File(baseTmpDir.getDir().toFile(), "vehicles_images");
            File vehicleImage =new File(vehicleImagesDir, uploadVehicleImageDTO.getImageName());
            Files.write(vehicleImage.toPath(), uploadVehicleImageDTO.getImageFile());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        try {
            File tmpdir = baseTmpDir.createDir("vehicles_images");
            unzipFile(getClass().getResourceAsStream("/vehicle_images.zip"), tmpdir);
            registry
                    .addResourceHandler("/vehicles-images/**")
                    .addResourceLocations("file:" + tmpdir.getAbsolutePath() + "/");
        } catch (IOException e) {
            e.printStackTrace();
        }
    }
}
