"use client";

/**
 * Individual message bubble component for chat display.
 *
 * Features:
 * - Different styling for user vs assistant messages
 * - Timestamps visible on hover
 * - Markdown support for assistant messages (future enhancement)
 * - Maximum width constraints for readability
 */

import React from 'react';
import { ChatMessage } from './types';

interface MessageBubbleProps {
  message: ChatMessage;
}

export default function MessageBubble({ message }: MessageBubbleProps) {
  const isUser = message.role === 'user';

  const formatTime = (date: Date) => {
    return new Date(date).toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: '2-digit',
    });
  };

  return (
    <div
      className={`flex ${isUser ? 'justify-end' : 'justify-start'} mb-4`}
    >
      <div
        className={`
          max-w-[80%] rounded-2xl px-4 py-3
          ${isUser
            ? 'bg-primary text-primary-foreground'
            : 'bg-muted text-foreground'
          }
          shadow-sm
          transition-all duration-200
          hover:shadow-md
        `}
      >
        <p className="text-sm whitespace-pre-wrap break-words">
          {message.content}
        </p>
        <span
          className={`
            text-xs mt-1 block opacity-70
            ${isUser ? 'text-right' : 'text-left'}
          `}
        >
          {formatTime(message.timestamp)}
        </span>
      </div>
    </div>
  );
}
