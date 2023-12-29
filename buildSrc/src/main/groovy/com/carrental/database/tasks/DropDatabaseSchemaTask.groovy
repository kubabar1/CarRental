package com.carrental.database.tasks

import groovy.sql.Sql
import org.gradle.api.DefaultTask
import org.gradle.api.tasks.Input
import org.gradle.api.tasks.TaskAction

import java.sql.ResultSet

class DropDatabaseSchemaTask extends DefaultTask {

    @Input
    String url

    @Input
    String user

    @Input
    String password

    @Input
    String driver

    @TaskAction
    def executeTask() {
        URLClassLoader loader = GroovyObject.class.classLoader as URLClassLoader
        loader.addURL(Class.forName(driver).location.toURI().toURL())
        try {
            Sql.withInstance(url, user, password, driver) { Sql sql -> {
                ResultSet rs = sql.connection.getMetaData().getTables(null, null, '%', 'TABLE')
                while (rs.next()) {
                    def tableName = rs.getString('TABLE_NAME')
                    println("Dropping schema: " + tableName)
                    sql.execute("DROP TABLE " + tableName + " CASCADE")
                }
            }}
        } catch (Exception e) {
            println(e.printStackTrace())
        }
    }
}
