package com.unilui.message_broker_api.model;

public class Message {
    private String queue;
    private String text;

    public Message(String queue, String message) {
        this.queue = queue;
        this.text = message;
    }

    public Message() {
    }

    public String getQueue() {
        return queue;
    }

    public void setQueue(String queue) {
        this.queue = queue;
    }

    public String getText() {
        return text;
    }

    public void setText(String text) {
        this.text = text;
    }
}
