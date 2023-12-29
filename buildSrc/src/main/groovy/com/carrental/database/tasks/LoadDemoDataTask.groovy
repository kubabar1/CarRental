package com.carrental.database.tasks

import groovy.sql.Sql
import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.InputFiles
import org.gradle.api.tasks.TaskAction

class LoadDemoDataTask extends DefaultTask {

    @Input
    String url

    @Input
    String user

    @Input
    String password

    @Input
    String driver

    @InputFiles
    List<File> dataFiles

    @TaskAction
    def executeTask() {
        URLClassLoader loader = GroovyObject.class.classLoader as URLClassLoader
        loader.addURL(Class.forName(driver).location.toURI().toURL())
        try {
            Sql.withInstance(url, user, password, driver) { Sql sql -> {
                dataFiles.each { data ->
                    println("Loading data from: " + data.path)
                    sql.execute(data.getText("UTF-8"))
                }
            }}
        } catch (Exception e) {
            println(e.printStackTrace())
        }
    }
}
