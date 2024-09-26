package com.unilui.message_broker_api.controller;

import com.unilui.message_broker_api.model.Message;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jms.JmsException;
import org.springframework.jms.annotation.EnableJms;
import org.springframework.jms.core.JmsTemplate;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api")
@EnableJms
public class MessageBrokerApiController {
    @Autowired
    private JmsTemplate jmsTemplate;

    @PostMapping("/queue/send")
    public void sendMessage(@RequestBody Message message)
    {
        try{
            jmsTemplate.convertAndSend(message.getQueue(), message.getText());
        }catch(JmsException ex){
            ex.printStackTrace();
        }
    }

    @GetMapping("/queue/read/{queueName}")
    Message readMessage(@PathVariable String queueName){
        try {
            // Browsing the queue to check for messages
            Boolean hasMessages = jmsTemplate.browse(queueName, (session, browser) -> {
                return browser.getEnumeration().hasMoreElements();
            });

            // If no messages are present
            if (!hasMessages) {
                return new Message(queueName, "No messages in the queue.");
            }

            // If messages exist, read the message
            Message message = new Message();
            message.setQueue(queueName);
            message.setText(jmsTemplate.receiveAndConvert(queueName).toString());
            return message;

        } catch (JmsException ex) {
            ex.printStackTrace();
            return new Message(queueName, "Error reading the queue.");
        }
    }
}
