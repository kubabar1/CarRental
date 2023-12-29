package com.carrental.setup.tasks.tomcat

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.InputFile
import org.gradle.api.tasks.OutputDirectory
import org.gradle.api.tasks.TaskAction

import java.nio.file.Files
import java.nio.file.StandardCopyOption

class CopyWarTask extends DefaultTask {

    @InputFile
    File warPath

    @OutputDirectory
    File outputTomcatWebappsDir

    @TaskAction
    def executeTask() {
        if (warPath.exists()) {
            def warFileName = warPath.name
            File outputTomcatWebappsDirWithFileName = new File(outputTomcatWebappsDir, warFileName)
            println("Copying WAR from '${warPath.absolutePath}'")
            Files.copy(warPath.toPath(), outputTomcatWebappsDirWithFileName.toPath(), StandardCopyOption.REPLACE_EXISTING)
            println("War copied to webapp directory '${outputTomcatWebappsDirWithFileName.absolutePath}'")
        } else {
            println("File '${warPath.absolutePath}' does not exists")
        }
    }
}
