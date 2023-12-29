package com.carrental.setup.tasks.tomcat.utils

import org.apache.commons.compress.archivers.ArchiveEntry
import org.apache.commons.compress.archivers.tar.TarArchiveInputStream
import org.apache.commons.compress.compressors.gzip.GzipCompressorInputStream

import java.nio.file.Path
import java.nio.file.Files

class TarExtractorCommonsCompress extends TarExtractor {

    TarExtractorCommonsCompress(Path tarFile, Path destination) throws IOException {
        super(tarFile, destination)
    }

    void untar(boolean extractFlat = false) {
        try {
            BufferedInputStream inputStream = new BufferedInputStream(getTarStream())
            TarArchiveInputStream tar = new TarArchiveInputStream(isGzip()
                    ? new GzipCompressorInputStream(inputStream)
                    : inputStream)
            ArchiveEntry entry
            while ((entry = tar.getNextEntry()) != null) {
                String destinationPath = extractFlat
                    ? entry.name.split(File.separator).drop(1).join(File.separator)
                    : entry.name
                Path extractTo = getDestination().resolve(destinationPath)
                if (entry.isDirectory()) {
                    Files.createDirectories(extractTo)
                } else {
                    Files.copy(tar, extractTo)
                }
            }
        } catch (IOException exception) {
            println(exception.printStackTrace())
        }
    }
}
