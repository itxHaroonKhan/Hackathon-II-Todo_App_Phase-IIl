"use client";

/**
 * Main chat panel component with glassmorphic design.
 *
 * Features:
 * - Slide-in animation from right
 * - Glassmorphic backdrop blur effect
 * - Fixed position with responsive sizing
 * - Auto-scroll to bottom on new messages
 * - Full-width on mobile (< 640px)
 */

import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import MessageBubble from './MessageBubble';
import MessageInput from './MessageInput';
import TypingIndicator from './TypingIndicator';
import { ChatState } from './types';

interface ChatPanelProps {
  chatState: ChatState;
  onSendMessage: (message: string) => void;
  onClose: () => void;
}

export default function ChatPanel({
  chatState,
  onSendMessage,
  onClose,
}: ChatPanelProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { isOpen, messages, isLoading, error } = chatState;

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isLoading]);

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop overlay (mobile only) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Chat panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className={`
          fixed z-50
          sm:bottom-6 sm:right-6
          bottom-0 right-0
          sm:w-[400px] w-full
          sm:h-[600px] h-[80vh]
          sm:rounded-2xl rounded-t-2xl
          bg-background/95 backdrop-blur-xl
          shadow-2xl border border-border
          flex flex-col
          overflow-hidden
        `}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
            <h2 className="text-lg font-semibold text-foreground">
              AI Assistant
            </h2>
          </div>
          <button
            onClick={onClose}
            className="
              p-2 rounded-lg
              hover:bg-accent
              text-muted-foreground
              transition-colors duration-200
              focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2
            "
            aria-label="Close chat"
          >
            <svg
              className="w-5 h-5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Messages area */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
          {messages.length === 0 && !isLoading && (
            <div className="flex flex-col items-center justify-center h-full text-center px-4">
              <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mb-4">
                <svg
                  className="w-8 h-8 text-emerald-600 dark:text-emerald-400"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"
                  />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-foreground mb-2">
                Welcome to your AI Assistant!
              </h3>
              <p className="text-sm text-muted-foreground max-w-xs">
                I can help you manage your tasks. Try asking me to:
              </p>
              <ul className="text-sm text-muted-foreground mt-3 space-y-1 text-left">
                <li>• Add a new task</li>
                <li>• List your pending tasks</li>
                <li>• Complete or delete tasks</li>
                <li>• Check who you're logged in as</li>
              </ul>
            </div>
          )}

          {messages.map((message) => (
            <MessageBubble key={message.id} message={message} />
          ))}

          {isLoading && <TypingIndicator />}

          {error && (
            <div className="bg-destructive/10 border border-destructive/30 rounded-lg p-3 text-sm text-destructive">
              <p className="font-medium">Error</p>
              <p>{error}</p>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {/* Input area */}
        <MessageInput onSend={onSendMessage} disabled={isLoading} />
      </motion.div>
    </>
  );
}
