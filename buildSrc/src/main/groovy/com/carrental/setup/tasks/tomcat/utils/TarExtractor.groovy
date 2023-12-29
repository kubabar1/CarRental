package com.carrental.setup.tasks.tomcat.utils

import java.nio.file.Path
import java.nio.file.Files

abstract class TarExtractor {

    final private InputStream tarStream

    final private boolean gzip

    final private Path destination

    protected TarExtractor(InputStream inputStream, boolean gzip, Path destination) throws IOException {
        this.tarStream = inputStream;
        this.gzip = gzip;
        this.destination = destination;
    }

    protected TarExtractor(Path tarFile, Path destination) throws IOException {
        this(Files.newInputStream(tarFile), tarFile.fileName.toString().endsWith(".gz"), destination)
    }

    protected getTarStream() {
        return tarStream
    }

    protected isGzip() {
        return gzip
    }

    protected getDestination() {
        return destination
    }

    abstract void untar(boolean extractFlat)
}
