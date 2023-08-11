package com.carrental.commons.authentication.config;


import java.util.ArrayList;
import java.util.List;

public class IgnoreAuthentication {

    private final List<String> permitAllAntPatterns;

    private IgnoreAuthentication(IgnoreAuthenticationBuilder builder) {
        this.permitAllAntPatterns = builder.permitAllAntPatterns;
    }

    public List<String> getPermitAllAntPatterns() {
        return permitAllAntPatterns;
    }

    public static class IgnoreAuthenticationBuilder{
        private final List<String> permitAllAntPatterns;

        public IgnoreAuthenticationBuilder(){
            this.permitAllAntPatterns = new ArrayList<>();
        }

        public IgnoreAuthenticationBuilder addUrl(String urlPattern) {
            this.permitAllAntPatterns.add(urlPattern);
            return this;
        }

        public IgnoreAuthentication build(){
            return new IgnoreAuthentication(this);
        }
    }
}
