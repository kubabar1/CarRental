package com.carrental.storageservicestub.config;

import com.carrental.storageservicestub.config.queue.StorageServiceStubQueueConfig;
import com.carrental.storageservicestub.config.resourcehandlers.VehiclesImagesResourceHandler;
import com.carrental.storageservicestub.config.security.IgnoreAuthenticationStorageService;
import com.carrental.storageservicestub.model.BaseTmpDir;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Import;

@Import({StorageServiceStubQueueConfig.class, IgnoreAuthenticationStorageService.class})
public class StorageServiceStubCoreConfig {

    @Bean
    public VehiclesImagesResourceHandler vehiclesImagesResourceHandler(BaseTmpDir baseTmpDir) {
        return new VehiclesImagesResourceHandler(baseTmpDir);
    }

    @Bean
    public BaseTmpDir tmpDirService() {
        return BaseTmpDir.getInstance();
    }
}
