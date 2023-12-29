package com.carrental.setup.plugins.tomcat

import org.gradle.api.provider.Property

interface TomcatPluginExtension {
    Property<String> getTomcatTarLocation()
    Property<String> getTomcatDestination()
    Property<String> getTomcatUsersConfig()
    Property<String> getTomcatServerConfig()
    Property<String> getKeystoreFile()
    Property<String> getWarPath()
    Property<String> getEnvFilePath()
}
