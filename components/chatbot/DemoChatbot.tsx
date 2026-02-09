"use client";

/**
 * Demo chatbot component that works without authentication.
 * 
 * This version simulates chat functionality for demonstration purposes
 * when no user is authenticated.
 */

import React, { useState } from 'react';
import ChatButton from './ChatButton';
import ChatPanel from './ChatPanel';
import { ChatState, MessageRole } from './types';

// Define a mock chat state for the demo
const initialDemoChatState: ChatState = {
  isOpen: false,
  messages: [
    {
      id: 'demo-welcome-1',
      conversationId: 'demo-conversation',
      role: 'assistant',
      content: 'Hello! I\'m your AI assistant. I\'m currently running in demo mode since you\'re not logged in. In a real scenario, I would help you manage your tasks and answer questions.',
      timestamp: new Date(Date.now() - 30000),
    },
    {
      id: 'demo-welcome-2',
      conversationId: 'demo-conversation',
      role: 'assistant',
      content: 'To experience the full functionality, please sign up or log in to your account. Then you\'ll be able to use the chatbot to manage your tasks!',
      timestamp: new Date(Date.now() - 15000),
    }
  ],
  isLoading: false,
  conversationId: 'demo-conversation',
  error: null,
};

export default function DemoChatbot() {
  const [chatState, setChatState] = useState(initialDemoChatState);

  const toggleChat = () => {
    setChatState(prev => ({
      ...prev,
      isOpen: !prev.isOpen,
      error: null
    }));
  };

  const sendMessage = (content: string) => {
    if (!content.trim()) return;

    // Add user message
    const userMessage = {
      id: `msg-${Date.now()}`,
      conversationId: 'demo-conversation',
      role: 'user' as MessageRole,
      content: content.trim(),
      timestamp: new Date(),
    };

    setChatState(prev => ({
      ...prev,
      messages: [...prev.messages, userMessage],
      isLoading: true,
    }));

    // Simulate AI response after a delay
    setTimeout(() => {
      const responses = [
        "I'm currently in demo mode. To experience the full functionality, please log in to your account.",
        "That's an interesting question! In the full version, I would be able to help you with that using your account data.",
        "I'd love to help you with that! Sign up or log in to unlock the full power of the AI assistant.",
        "Thanks for your message! When you're logged in, I can assist with managing your tasks and more.",
        "Great question! After logging in, I'll be able to provide personalized assistance based on your account."
      ];
      
      const randomResponse = responses[Math.floor(Math.random() * responses.length)];
      
      const aiMessage = {
        id: `ai-msg-${Date.now()}`,
        conversationId: 'demo-conversation',
        role: 'assistant' as MessageRole,
        content: randomResponse,
        timestamp: new Date(),
      };

      setChatState(prev => ({
        ...prev,
        messages: [...prev.messages, aiMessage],
        isLoading: false,
      }));
    }, 1000);
  };

  return (
    <>
      <ChatButton onClick={toggleChat} isOpen={chatState.isOpen} />
      <ChatPanel
        chatState={chatState}
        onSendMessage={sendMessage}
        onClose={toggleChat}
      />
    </>
  );
}