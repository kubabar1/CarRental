package com.carrental.database.plugins

import org.gradle.api.provider.ListProperty
import org.gradle.api.provider.Property

interface DatabasePluginExtension {
    Property<String> getUrl()
    Property<String> getUser()
    Property<String> getPassword()
    Property<String> getDriver()
    ListProperty<String> getSchemaFiles()
    ListProperty<String> getDataFiles()
}
