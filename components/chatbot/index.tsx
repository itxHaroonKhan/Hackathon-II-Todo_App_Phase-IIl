"use client";

/**
 * Main chatbot integration component.
 *
 * Combines ChatButton and ChatPanel with useChat hook.
 * Can be dropped into any layout to add chatbot functionality.
 */

import React from 'react';
import ChatButton from './ChatButton';
import ChatPanel from './ChatPanel';
import { useChat } from './useChat';

interface ChatbotProps {
  userId?: number;
  token?: string;
}

export default function Chatbot({ userId, token }: ChatbotProps) {
  const { chatState, toggleChat, sendMessage } = useChat({ userId, token });

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

// Export components for custom implementations
export { ChatButton, ChatPanel, useChat };
export type { ChatMessage, ChatState } from './types';
