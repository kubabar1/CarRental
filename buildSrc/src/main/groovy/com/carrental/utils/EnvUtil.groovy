package com.carrental.utils

class EnvUtil {

    static LinkedHashMap<String, String> getSystemEnvs(File envFile) {
        return envFile.readLines().inject([:]) { memo, entry ->
            def (key, value) = entry.tokenize('=')
            if (key != null && value != null && !key.empty) {
                memo[key] = value
            }
            return memo as LinkedHashMap<String, String>
        }
    }
}
