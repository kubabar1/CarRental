package com.carrental.setup.tasks.tomcat

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.InputFile
import org.gradle.api.tasks.Internal
import org.gradle.api.tasks.TaskAction

class StartupTomcatTask extends DefaultTask {

    @InputFile
    File tomcatStartupScript

    @Internal
    File tomcatLogsFile

    @TaskAction
    def executeTask() {
        try {
            tomcatStartupScript.absolutePath.execute()
            println("Tomcat started, run below command to display logs")
            println("tail -f ${tomcatLogsFile}")
        } catch(IOException exception) {
            exception.printStackTrace()
        }
    }
}
