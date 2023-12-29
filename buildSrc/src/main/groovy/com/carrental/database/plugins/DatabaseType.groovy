package com.carrental.database.plugins;

enum DatabaseType {
    PSQL("psql"),
    H2('h2');

    private String shortcut;

    DatabaseType(String shortcut) {
        this.shortcut = shortcut;
    }

    String getShortcut() {
        return shortcut
    }
}
