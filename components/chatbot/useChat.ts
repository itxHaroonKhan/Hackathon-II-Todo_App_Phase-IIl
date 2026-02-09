"use client";

/**
 * Custom hook for chat functionality.
 *
 * Manages chat state, message sending, and conversation persistence.
 */

import { useState, useCallback } from 'react';
import { ChatState, ChatMessage } from './types';
import { sendChatMessage, ChatAPIError } from '@/lib/chat-api';

// Simple ID generator for messages
const generateId = () => `msg_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

interface UseChatOptions {
  userId?: number;
  token?: string;
}

export function useChat({ userId, token }: UseChatOptions = {}) {
  const [chatState, setChatState] = useState<ChatState>({
    isOpen: false,
    messages: [],
    isLoading: false,
    conversationId: null,
    error: null,
  });

  const openChat = useCallback(() => {
    setChatState((prev) => ({ ...prev, isOpen: true, error: null }));
  }, []);

  const closeChat = useCallback(() => {
    setChatState((prev) => ({ ...prev, isOpen: false }));
  }, []);

  const toggleChat = useCallback(() => {
    setChatState((prev) => ({ ...prev, isOpen: !prev.isOpen, error: null }));
  }, []);

  const clearError = useCallback(() => {
    setChatState((prev) => ({ ...prev, error: null }));
  }, []);

  const sendMessage = useCallback(
    async (content: string) => {
      if (!userId || !token) {
        setChatState((prev) => ({
          ...prev,
          error: 'Authentication required. Please log in.',
        }));
        return;
      }

      const trimmed = content.trim();
      if (!trimmed) return;

      // Add user message to UI immediately
      const userMessage: ChatMessage = {
        id: generateId(),
        conversationId: chatState.conversationId || '', // ✅ FIX: Ensure conversationId is string
        role: 'user',
        content: trimmed,
        timestamp: new Date(),
      };

      setChatState((prev) => ({
        ...prev,
        messages: [...prev.messages, userMessage],
        isLoading: true,
        error: null,
      }));

      try {
        // Send message to backend
        const response = await sendChatMessage(
          userId,
          {
            message: trimmed,
            conversation_id: chatState.conversationId || undefined,
          },
          token
        );

        // Add assistant response to UI
        const assistantMessage: ChatMessage = {
          id: generateId(),
          conversationId: response.conversation_id,
          role: 'assistant',
          content: response.response,
          timestamp: new Date(),
        };

        setChatState((prev) => ({
          ...prev,
          messages: [...prev.messages, assistantMessage],
          isLoading: false,
          conversationId: response.conversation_id,
        }));
      } catch (error) {
        let errorMessage = 'Failed to send message. Please try again.';

        if (error instanceof ChatAPIError) {
          // ✅ FIX: Handle specific backend configuration errors more gracefully
          if (error.message.includes('BETTER_AUTH_SECRET') || error.statusCode === 500) {
            errorMessage = 'Backend service temporarily unavailable. Please contact support if the issue persists.';
            console.error('Backend configuration error - missing BETTER_AUTH_SECRET or other server-side issue:', error);
          } else {
            errorMessage = error.message;
          }
        } else if (error instanceof TypeError && error.message.includes('fetch')) {
          errorMessage = 'Network error. Please check your connection and try again.';
        } else {
          // ✅ FIX: More specific error handling for other cases
          errorMessage = `Communication error: ${error instanceof Error ? error.message : 'Unknown error'}`;
        }

        setChatState((prev) => ({
          ...prev,
          isLoading: false,
          error: errorMessage,
        }));
      }
    },
    [userId, token, chatState.conversationId]
  );

  return {
    chatState,
    openChat,
    closeChat,
    toggleChat,
    sendMessage,
    clearError,
  };
}
