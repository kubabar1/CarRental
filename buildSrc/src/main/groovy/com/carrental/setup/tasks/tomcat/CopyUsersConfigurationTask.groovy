package com.carrental.setup.tasks.tomcat

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.InputFile
import org.gradle.api.tasks.OutputDirectory
import org.gradle.api.tasks.TaskAction

import java.nio.file.Files
import java.nio.file.StandardCopyOption

class CopyUsersConfigurationTask extends DefaultTask {

    @InputFile
    File tomcatUsersConfig

    @OutputDirectory
    File outputTomcatConfig

    @TaskAction
    def executeTask() {
        if (tomcatUsersConfig.exists()) {
            def tomcatUsersConfigFile = 'tomcat-users.xml'
            File outputTomcatUsersConfigFile = new File(outputTomcatConfig, tomcatUsersConfigFile)
            println("Copying tomcat users configuration file from '${tomcatUsersConfig.absolutePath}'")
            Files.copy(tomcatUsersConfig.toPath(), outputTomcatUsersConfigFile.toPath(), StandardCopyOption.REPLACE_EXISTING)
            println("Tomcat users configuration copied to '${outputTomcatUsersConfigFile.absolutePath}'")
        } else {
            println("File '${tomcatUsersConfig.absolutePath}' does not exists")
        }
    }
}
