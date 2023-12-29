package com.carrental.setup.tasks.tomcat

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.InputFile
import org.gradle.api.tasks.Optional
import org.gradle.api.tasks.OutputDirectory
import org.gradle.api.tasks.TaskAction

import java.nio.file.Files
import java.nio.file.StandardCopyOption

class CopyServerConfigurationTask extends DefaultTask {

    @Input
    @Optional
    String tomcatServerConfigPath

    @OutputDirectory
    File outputTomcatConfig

    @TaskAction
    def executeTask() {
        if (tomcatServerConfigPath == null) {
            return
        }
        File tomcatServerConfig = new File(tomcatServerConfigPath)
        if (tomcatServerConfig.exists()) {
            def tomcatServerConfigFile = 'server.xml'
            File outputTomcatServerConfigFile = new File(outputTomcatConfig, tomcatServerConfigFile)
            println("Copying tomcat server configuration file from '${tomcatServerConfig.absolutePath}'")
            Files.copy(tomcatServerConfig.toPath(), outputTomcatServerConfigFile.toPath(), StandardCopyOption.REPLACE_EXISTING)
            println("Tomcat server configuration copied to '${outputTomcatServerConfigFile}'")
        } else {
            println("File '${tomcatServerConfig.absolutePath}' does not exists")
        }
    }
}