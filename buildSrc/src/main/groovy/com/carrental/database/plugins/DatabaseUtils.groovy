package com.carrental.database.plugins

import org.gradle.api.initialization.IncludedBuild

import java.util.stream.Collectors

class DatabaseUtils {

    static List<String> getAllSchemaFilesPaths(Collection<IncludedBuild> includedBuilds, DatabaseType databaseType) {
        return includedBuilds.stream().map {pr ->
            File[] resourceFiles = new File(pr.projectDir, 'src/main/resources').listFiles()
            if (resourceFiles != null) {
                return Arrays.stream(resourceFiles)
                    .filter(f -> f.name ==~ "schema-${databaseType.getShortcut()}.sql")
                    .map(f -> f.absolutePath)
                    .collect(Collectors.toList())
            }
            return new ArrayList<String>()
        }.flatMap(List::stream).collect(Collectors.toList())
    }

    static List<String> getAllDataFilesPaths(Collection<IncludedBuild> includedBuilds) {
        return includedBuilds.stream().map {pr ->
            File[] resourceFiles = new File(pr.projectDir, 'src/main/resources').listFiles()
            if (resourceFiles != null) {
                return Arrays.stream(resourceFiles)
                    .filter(f -> f.name ==~ "data.sql")
                    .map(f -> f.absolutePath)
                    .collect(Collectors.toList())
            }
            return new ArrayList<String>()
        }.flatMap(List::stream).collect(Collectors.toList())
    }
}
