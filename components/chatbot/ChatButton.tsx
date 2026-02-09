"use client";

/**
 * Floating chat button that triggers the chatbot panel.
 *
 * Features:
 * - Fixed position in bottom-right corner
 * - Subtle pulse animation when idle
 * - Emerald green accent color
 * - Accessible with ARIA labels
 */

import React from 'react';
import { motion } from 'framer-motion';

interface ChatButtonProps {
  onClick: () => void;
  isOpen: boolean;
}

export default function ChatButton({ onClick, isOpen }: ChatButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={`
        fixed bottom-6 right-6 z-50
        w-14 h-14 rounded-full
        bg-primary hover:bg-primary/90
        text-primary-foreground shadow-lg hover:shadow-xl
        transition-all duration-300
        flex items-center justify-center
        border border-border
        backdrop-blur-sm
      `}
      aria-label={isOpen ? "Close chat" : "Open chat"}
      title={isOpen ? "Close AI assistant" : "Open AI assistant"}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      animate={{
        scale: !isOpen ? [1, 1.05, 1] : 1,
        boxShadow: !isOpen ?
          ["0 4px 6px rgba(0,0,0,0.1)", "0 10px 15px rgba(0,0,0,0.1)", "0 4px 6px rgba(0,0,0,0.1)"] :
          "0 4px 6px rgba(0,0,0,0.1)"
      }}
      transition={{
        scale: {
          duration: 2,
          repeat: !isOpen ? Infinity : 0,
          repeatType: "reverse"
        },
        boxShadow: {
          duration: 2,
          repeat: !isOpen ? Infinity : 0,
          repeatType: "reverse"
        }
      }}
    >
      {isOpen ? (
        <svg
          className="w-6 h-6"
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
      ) : (
        <svg
          className="w-6 h-6"
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
      )}
    </motion.button>
  );
}
