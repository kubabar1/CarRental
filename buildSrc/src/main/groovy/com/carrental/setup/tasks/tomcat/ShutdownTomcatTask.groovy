package com.carrental.setup.tasks.tomcat

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.InputFile
import org.gradle.api.tasks.TaskAction

class ShutdownTomcatTask extends DefaultTask {

    @InputFile
    File tomcatShutdownScript

    @TaskAction
    def executeTask() {
        tomcatShutdownScript.absolutePath.execute()
        println("Tomcat is shutting down")
    }
}
