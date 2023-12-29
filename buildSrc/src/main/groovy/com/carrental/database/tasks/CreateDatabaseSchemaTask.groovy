package com.carrental.database.tasks

import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.InputFiles
import org.gradle.api.tasks.TaskAction
import groovy.sql.Sql

class CreateDatabaseSchemaTask extends DefaultTask {

    @Input
    String url

    @Input
    String user

    @Input
    String password

    @Input
    String driver

    @InputFiles
    List<File> schemaFiles

    @TaskAction
    def executeTask() {
        URLClassLoader loader = GroovyObject.class.classLoader as URLClassLoader
        loader.addURL(Class.forName(driver).location.toURI().toURL())
        try {
            Sql.withInstance(url, user, password, driver) { Sql sql -> {
                schemaFiles.each {schema ->
                    println("Creating schema: " + schema.path)
                    sql.execute(schema.getText("UTF-8"))
                }
            }}
        } catch (Exception e) {
            println(e.printStackTrace())
        }
    }
}
