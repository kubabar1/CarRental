package com.carrental.setup.tasks.tomcat

import com.carrental.utils.EnvUtil
import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.Optional
import org.gradle.api.tasks.OutputDirectory
import org.gradle.api.tasks.TaskAction

class CopyEnvTomcatTask extends DefaultTask {

    @Input
    @Optional
    String envFilePath

    @OutputDirectory
    File outputTomcatSetEnvFile

    @TaskAction
    def executeTask() {
        if (envFilePath == null) {
            return
        }
        File envFile = new File(envFilePath)
        if (envFile.exists()) {
            if (outputTomcatSetEnvFile.exists()) {
                outputTomcatSetEnvFile.delete()
            }
            outputTomcatSetEnvFile.createNewFile()
            LinkedHashMap<String, String> systemPropsFromEnv = EnvUtil.getSystemEnvs(envFile)
            systemPropsFromEnv.each {
                outputTomcatSetEnvFile.append("export ${it.key}=${it.value}\n")
            }
            println("Creating 'setenv.sh' file from '${envFilePath}'")
        } else {
            println("File '${envFile.absolutePath}' does not exists")
        }
    }
}
