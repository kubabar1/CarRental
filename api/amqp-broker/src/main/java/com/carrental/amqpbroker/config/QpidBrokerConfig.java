package com.carrental.amqpbroker.config;

//import org.apache.qpid.server.SystemLauncher;
//import org.apache.qpid.server.configuration.IllegalConfigurationException;
//import org.apache.qpid.server.model.SystemConfig;
import org.springframework.context.annotation.Bean;

import java.net.URL;
import java.util.HashMap;
import java.util.Map;

public class QpidBrokerConfig {

    private static final String INITIAL_CONFIGURATION = "qpid-config.json";

//    @Bean
//    public SystemLauncher systemLauncher() {
//        SystemLauncher broker = new SystemLauncher();
//        try {
//            broker.startup(createSystemConfig());
//        } catch (Exception exception) {
//            broker.shutdown();
//        }
//        return broker;
//    }

//    private Map<String, Object> createSystemConfig() throws IllegalConfigurationException {
//        Map<String, Object> attributes = new HashMap<>();
//        URL initialConfigUrl = AmqpBrokerCoreConfig.class.getClassLoader().getResource(INITIAL_CONFIGURATION);
//        if (initialConfigUrl == null) {
//            throw new IllegalConfigurationException("Configuration location '" + INITIAL_CONFIGURATION + "' not found");
//        }
//        attributes.put(SystemConfig.TYPE, "Memory");
//        attributes.put(SystemConfig.INITIAL_CONFIGURATION_LOCATION, initialConfigUrl.toExternalForm());
//        attributes.put(SystemConfig.STARTUP_LOGGED_TO_SYSTEM_OUT, true);
//
//        return attributes;
//    }
}
