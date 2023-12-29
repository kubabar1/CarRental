package com.carrental.database.plugins

import com.carrental.database.tasks.DropDatabaseSchemaTask
import com.carrental.database.tasks.CreateDatabaseSchemaTask
import com.carrental.database.tasks.LoadDemoDataTask
import org.gradle.api.Plugin
import org.gradle.api.Project

import java.util.stream.Collectors

class DatabasePlugin implements Plugin<Project> {

    void apply(Project project) {
        def extension = project.extensions.create('databasePlugin', DatabasePluginExtension)
        createDropDatabaseSchemaTask(project, extension)
        createCreateDatabaseSchemaTask(project, extension)
        createLoadDemoDataTask(project, extension)
        recreateDatabaseTask(project)
    }

    private static void createDropDatabaseSchemaTask(Project project, DatabasePluginExtension extension) {
        project.tasks.register('dropDatabaseSchema', DropDatabaseSchemaTask) {
            url = extension.getUrl().get()
            user = extension.getUser().get()
            password = extension.getPassword().get()
            driver = extension.getDriver().get()
        }
    }

    private static void createCreateDatabaseSchemaTask(Project project, DatabasePluginExtension extension) {
        project.tasks.register('createDatabaseSchema', CreateDatabaseSchemaTask) {
            url = extension.getUrl().get()
            user = extension.getUser().get()
            password = extension.getPassword().get()
            driver = extension.getDriver().get()
            schemaFiles = extension.getSchemaFiles().get().stream().map(File::new).collect(Collectors.toList())

            mustRunAfter 'dropDatabaseSchema'
        }
    }

    private static void createLoadDemoDataTask(Project project, DatabasePluginExtension extension) {
        project.tasks.register('loadDemoDataTask', LoadDemoDataTask) {
            url = extension.getUrl().get()
            user = extension.getUser().get()
            password = extension.getPassword().get()
            driver = extension.getDriver().get()
            dataFiles = extension.getDataFiles().get().stream().map(File::new).collect(Collectors.toList())

            mustRunAfter 'dropDatabaseSchema'
            mustRunAfter 'createDatabaseSchema'
        }
    }

    private static void recreateDatabaseTask(Project project) {
        project.tasks.register('recreateDatabase') {
            dependsOn 'dropDatabaseSchema'
            dependsOn 'createDatabaseSchema'
            dependsOn 'loadDemoDataTask'
        }
    }
}
