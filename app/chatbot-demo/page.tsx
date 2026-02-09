"use client";

/**
 * Chatbot Demo Page
 *
 * Standalone page to demonstrate the AI chatbot functionality.
 * This page shows the chatbot UI without requiring full app integration.
 */

import React, { useState, useEffect } from 'react';
import ChatButton from '@/components/chatbot/ChatButton';
import ChatPanel from '@/components/chatbot/ChatPanel';
import { useChat } from '@/components/chatbot/useChat';

export default function ChatbotDemoPage() {
  const [authData, setAuthData] = useState<{ userId: number | null; token: string | null }>({ 
    userId: null, 
    token: null 
  });

  // Try to get auth data from localStorage (simulating a logged-in state for demo)
  useEffect(() => {
    const token = localStorage.getItem('token');
    const userData = localStorage.getItem('user');
    
    if (token && userData) {
      try {
        const user = JSON.parse(userData);
        setAuthData({ userId: user.id, token });
      } catch (error) {
        console.error('Failed to parse user data:', error);
        // Fallback to a default user ID for demo purposes if parsing fails
        setAuthData({ userId: 1, token });
      }
    } else {
      // If no auth data exists, show a message prompting the user to log in
      console.log('No authentication data found. Please log in to use the chatbot.');
    }
  }, []);

  const { chatState, toggleChat, sendMessage } = useChat({
    userId: authData.userId || undefined,
    token: authData.token || undefined,
  });

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-emerald-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950">
      <div className="max-w-4xl mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-slate-100 mb-4">
            AI Chatbot Demo
          </h1>
          <p className="text-lg text-slate-600 dark:text-slate-400">
            {authData.userId ? 
              "Click the floating button in the bottom-right corner to open the AI assistant" :
              "Please log in first to use the chatbot. Sign up or log in using the buttons in the header."
            }
          </p>
        </div>

        <div className="bg-white dark:bg-slate-900 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-800">
          <h2 className="text-2xl font-semibold text-slate-900 dark:text-slate-100 mb-4">
            What can the chatbot do?
          </h2>

          <div className="space-y-4 text-slate-700 dark:text-slate-300">
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-emerald-100 dark:bg-emerald-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-emerald-600 dark:text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Add Tasks</h3>
                <p className="text-sm">Try: "Add weekly meeting for Friday"</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">List Tasks</h3>
                <p className="text-sm">Try: "Show me all pending tasks"</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-purple-100 dark:bg-purple-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-purple-600 dark:text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Complete Tasks</h3>
                <p className="text-sm">Try: "Complete task #1"</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-8 h-8 bg-pink-100 dark:bg-pink-900/30 rounded-lg flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-pink-600 dark:text-pink-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold mb-1">Check Identity</h3>
                <p className="text-sm">Try: "Who am I?"</p>
              </div>
            </div>
          </div>

          <div className="mt-8 p-4 bg-emerald-50 dark:bg-emerald-900/20 rounded-lg border border-emerald-200 dark:border-emerald-800">
            <p className="text-sm text-emerald-800 dark:text-emerald-200">
              <strong>Tip:</strong> The chatbot uses AI to understand natural language. You can phrase your requests however you like!
            </p>
          </div>
        </div>
      </div>

      {/* Chatbot UI - only show if user is authenticated */}
      {authData.userId && authData.token && (
        <>
          <ChatButton onClick={toggleChat} isOpen={chatState.isOpen} />
          <ChatPanel
            chatState={chatState}
            onSendMessage={sendMessage}
            onClose={toggleChat}
          />
        </>
      )}
    </div>
  );
}
