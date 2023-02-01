package com.carrental.storageservicestub.model;

import org.apache.tomcat.util.http.fileupload.FileUtils;

import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;

public final class BaseTmpDir {

    private static BaseTmpDir instance;

    private final Path dir;

    private BaseTmpDir() {
        this.dir = createBaseTmpDir();
    }

    public static BaseTmpDir getInstance() {
        if (instance == null) {
            instance = new BaseTmpDir();
        }
        return instance;
    }

    public Path getDir() {
        return dir;
    }

    public File createDir(String dirName) {
        File subDir = new File(dir.toFile(), dirName);
        subDir.mkdir();
        return  subDir;
    }

    private Path createBaseTmpDir() {
        Path tmpdir;
        try {
            tmpdir = Files.createTempDirectory("car-rental-");
            Runtime.getRuntime().addShutdownHook(new Thread(() -> {
                try {
                    FileUtils.forceDelete(tmpdir.toFile());
                } catch (IOException e) {
                    e.printStackTrace();
                }
            }));
            return tmpdir;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
