package com.carrental.setup.tasks.tomcat

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.InputFile
import org.gradle.api.tasks.Optional
import org.gradle.api.tasks.OutputDirectory
import org.gradle.api.tasks.TaskAction

import java.nio.file.Files
import java.nio.file.StandardCopyOption

class CopyKeystoreTask extends DefaultTask {

    @Input
    @Optional
    String keystoreFilePath

    @OutputDirectory
    File outputTomcatConfig

    @TaskAction
    def executeTask() {
        if (keystoreFilePath == null) {
            return
        }
        File keystoreFile = new File(keystoreFilePath)
        if (keystoreFile.exists()) {
            def keystoreFileName = keystoreFile.name
            File outputKeystoreConfigFile = new File(outputTomcatConfig, keystoreFileName)
            println("Copying keystore from '${keystoreFile.absolutePath}'")
            Files.copy(keystoreFile.toPath(), outputKeystoreConfigFile.toPath(), StandardCopyOption.REPLACE_EXISTING)
            println("Keystore copied to '${outputKeystoreConfigFile.absolutePath}'")
        } else {
            println("File '${keystoreFile.absolutePath}' does not exists")
        }
    }
}
