package com.carrental.storageservicestub.config.resourcehandlers;

import com.carrental.storageservicestub.model.BaseTmpDir;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.io.*;

import static com.carrental.commons.utils.ZipUtils.unzipFile;

public class VehiclesImagesResourceHandler implements WebMvcConfigurer {

    private final BaseTmpDir baseTmpDir;

    public VehiclesImagesResourceHandler(BaseTmpDir baseTmpDir) {
        this.baseTmpDir = baseTmpDir;
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
