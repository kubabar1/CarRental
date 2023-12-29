package com.carrental.setup.tasks.tomcat

import com.carrental.setup.tasks.tomcat.utils.TarExtractorCommonsCompress
import org.gradle.api.DefaultTask
import org.gradle.api.tasks.InputFile
import org.gradle.api.tasks.OutputDirectory
import org.gradle.api.tasks.TaskAction

import java.nio.file.Files
import java.nio.file.StandardCopyOption

class CopyAndExtractTomcatTask extends DefaultTask {

    @InputFile
    File tomcatTarLocation

    @OutputDirectory
    File tomcatDestination

    @TaskAction
    def executeTask() {
        if (tomcatTarLocation.exists()) {
            def tomcatTarFileName = tomcatTarLocation.name
            def tomcatTarDestinationWithFilename = new File(tomcatDestination, tomcatTarFileName)
            Files.copy(tomcatTarLocation.toPath(), tomcatTarDestinationWithFilename.toPath(), StandardCopyOption.REPLACE_EXISTING)
            TarExtractorCommonsCompress tarExtractorCommonsCompress =
                new TarExtractorCommonsCompress(tomcatTarDestinationWithFilename.toPath(), tomcatDestination.toPath())
            tarExtractorCommonsCompress.untar(true)
            setExecutableToTomcatBinFiles()
            tomcatTarDestinationWithFilename.delete()
        }
    }

    void setExecutableToTomcatBinFiles() {
        new File(tomcatDestination, 'bin').eachFile {
            it.setExecutable(true)
        }
    }
}