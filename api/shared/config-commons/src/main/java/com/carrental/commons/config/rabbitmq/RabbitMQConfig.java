package com.carrental.commons.config.rabbitmq;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.rabbit.listener.SimpleMessageListenerContainer;
import org.springframework.amqp.rabbit.listener.api.ChannelAwareMessageListener;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.context.annotation.Bean;

import javax.inject.Inject;
import java.nio.charset.StandardCharsets;

public class RabbitMQConfig {

    @Inject
    private ConnectionFactory connectionFactory;

    @Bean
    public RabbitMQProperties rabbitMQProperties() {
        return new RabbitMQProperties();
    }

    @Bean
    public DirectExchange rabbitMqExchange(RabbitMQProperties rabbitMQProperties) {
        return new DirectExchange(rabbitMQProperties.getExchange(), false, true);
    }

    @Bean
    public DirectExchange rabbitMqDeadLetterExchange(RabbitMQProperties rabbitMQProperties) {
        return new DirectExchange(rabbitMQProperties.getDlxExchange(), false, true);
    }

    @Bean
    public Queue dlqDefaultQueue(RabbitMQProperties rabbitMQProperties) {
        return new Queue(rabbitMQProperties.getDlqDefaultQueue(), false, false, true);
    }

    @Bean
    public Binding dlqDefaultQueueBinding(Queue dlqDefaultQueue, DirectExchange rabbitMqDeadLetterExchange) {
        return BindingBuilder.bind(dlqDefaultQueue).to(rabbitMqDeadLetterExchange).with(dlqDefaultQueue.getName());
    }

    @Bean
    public SimpleMessageListenerContainer getVehicleByIdDlqListener(RabbitMQProperties rabbitMQProperties) {
        SimpleMessageListenerContainer container = new SimpleMessageListenerContainer();
        container.setConnectionFactory(connectionFactory);
        container.setQueueNames(rabbitMQProperties.getDlqDefaultQueue());
        container.setMessageListener((ChannelAwareMessageListener) (message, channel) -> {
            byte[] messageBody = message.getBody();
            String messageResult = new String(messageBody, StandardCharsets.UTF_8);
            System.out.println("Received '" + messageResult + "'");
           });
        return container;
    }

    @Bean
    public RabbitTemplate rabbitTemplate(
        ConnectionFactory connectionFactory,
        Jackson2JsonMessageConverter jackson2JsonMessageConverter
    ) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jackson2JsonMessageConverter);
        return rabbitTemplate;
    }

    @Bean
    public Jackson2JsonMessageConverter producerJackson2MessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
