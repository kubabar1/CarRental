package com.carrental.storageservicestub;

import com.carrental.storageservicestub.config.StorageServiceStubCoreConfig;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Import;

@Import({StorageServiceStubCoreConfig.class})
@SpringBootApplication
public class StorageServiceStubApplication {

    public static void main(String[] args) {
        SpringApplication.run(StorageServiceStubApplication.class, args);
    }
}