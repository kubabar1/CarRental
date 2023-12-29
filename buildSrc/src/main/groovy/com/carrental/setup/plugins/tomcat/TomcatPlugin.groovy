package com.carrental.setup.plugins.tomcat

import com.carrental.setup.tasks.tomcat.CopyEnvTomcatTask
import com.carrental.setup.tasks.tomcat.CopyKeystoreTask
import com.carrental.setup.tasks.tomcat.CopyServerConfigurationTask
import com.carrental.setup.tasks.tomcat.CopyUsersConfigurationTask
import com.carrental.setup.tasks.tomcat.CopyWarTask
import com.carrental.setup.tasks.tomcat.ShutdownTomcatTask
import com.carrental.setup.tasks.tomcat.StartupTomcatTask
import org.gradle.api.Plugin
import org.gradle.api.Project
import com.carrental.setup.tasks.tomcat.CopyAndExtractTomcatTask

class TomcatPlugin implements Plugin<Project> {

    void apply(Project project) {
        def extension = project.extensions.create('tomcatPlugin', TomcatPluginExtension)
        createCopyAndExtractTomcatTask(project, extension)
        copyTomcatUsersConfigurationTask(project, extension)
        copyTomcatServerConfigurationTask(project, extension)
        copyKeystoreTask(project, extension)
        copyWarToTomcatTask(project, extension)
        copyEnvToTomcatTask(project, extension)
        startupTomcatTask(project, extension)
        shutdownTomcatTask(project, extension)
        setupAppTomcatTask(project)
    }

    private static void createCopyAndExtractTomcatTask(Project project, TomcatPluginExtension extension) {
        project.tasks.register('copyAndExtractTomcat', CopyAndExtractTomcatTask) {
            tomcatTarLocation = new File(extension.tomcatTarLocation.get())
            tomcatDestination = new File(extension.tomcatDestination.get())
        }
    }

    private static void copyTomcatUsersConfigurationTask(Project project, TomcatPluginExtension extension) {
        project.tasks.register('copyTomcatUsersConfiguration', CopyUsersConfigurationTask) {
            tomcatUsersConfig = new File(extension.tomcatUsersConfig.get())
            outputTomcatConfig = new File(extension.tomcatDestination.get(), 'conf')
            mustRunAfter 'copyAndExtractTomcat'
        }
    }

    private static void copyTomcatServerConfigurationTask(Project project, TomcatPluginExtension extension) {
        project.tasks.register('copyTomcatServerConfiguration', CopyServerConfigurationTask) {
            tomcatServerConfigPath = extension.tomcatServerConfig.getOrNull()
            outputTomcatConfig = new File(extension.tomcatDestination.get(), 'conf')
            mustRunAfter 'copyAndExtractTomcat'
        }
    }

    private static void copyKeystoreTask(Project project, TomcatPluginExtension extension) {
        project.tasks.register('copyTomcatKeystore', CopyKeystoreTask) {
            keystoreFilePath = extension.keystoreFile.getOrNull()
            outputTomcatConfig = new File(extension.tomcatDestination.get(), 'conf')
            mustRunAfter 'copyAndExtractTomcat'
        }
    }

    private static void copyWarToTomcatTask(Project project, TomcatPluginExtension extension) {
        project.tasks.register('copyWarToTomcatWebapps', CopyWarTask) {
            warPath = new File(extension.warPath.get())
            outputTomcatWebappsDir = new File(extension.tomcatDestination.get(), 'webapps')
            mustRunAfter 'copyAndExtractTomcat'
        }
    }

    private static void copyEnvToTomcatTask(Project project, TomcatPluginExtension extension) {
        project.tasks.register('copyEnvToTomcat', CopyEnvTomcatTask) {
            envFilePath = new File(extension.envFilePath.get())
            outputTomcatSetEnvFile = new File(extension.tomcatDestination.get(), 'bin/setenv.sh')
            mustRunAfter 'copyAndExtractTomcat'
        }
    }

    private static void startupTomcatTask(Project project, TomcatPluginExtension extension) {
        project.tasks.register('tomcatStartup', StartupTomcatTask) {
            tomcatStartupScript = new File(extension.tomcatDestination.get(), 'bin/startup.sh')
            tomcatLogsFile = new File(extension.tomcatDestination.get(), 'logs/catalina.out')
            mustRunAfter 'copyAndExtractTomcat'
            mustRunAfter 'copyTomcatUsersConfiguration'
            mustRunAfter 'copyTomcatServerConfiguration'
            mustRunAfter 'copyWarToTomcatWebapps'
        }
    }

    private static void shutdownTomcatTask(Project project, TomcatPluginExtension extension) {
        project.tasks.register('tomcatShutdown', ShutdownTomcatTask) {
            tomcatShutdownScript = new File(extension.tomcatDestination.get(), 'bin/shutdown.sh')
        }
    }

    private static void setupAppTomcatTask(Project project) {
        project.tasks.register('setupAppTomcat') {
            dependsOn 'copyAndExtractTomcat'
            dependsOn 'copyTomcatUsersConfiguration'
            dependsOn 'copyTomcatServerConfiguration'
            dependsOn 'copyTomcatKeystore'
            dependsOn 'copyWarToTomcatWebapps'
            dependsOn 'copyEnvToTomcat'
            dependsOn 'tomcatStartup'
        }
    }
}
