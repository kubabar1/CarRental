package com.carrental.storageservicestub.model;

import org.apache.commons.io.FileUtils;

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

    public void deleteTmpDir() {
        try {
            FileUtils.forceDelete(this.dir.toFile());
        } catch (IOException e) {
            e.printStackTrace();
        }
    }

    private Path createBaseTmpDir() {
        Path tmpdir;
        try {
            tmpdir = Files.createTempDirectory("car-rental-");
            return tmpdir;
        } catch (IOException e) {
            e.printStackTrace();
        }
        return null;
    }
}
