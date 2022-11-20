package com.carrental.amqpbroker.config;

import org.springframework.context.annotation.Import;

@Import({ QueueConfig.class })
public class AmqpBrokerCoreConfig { }
