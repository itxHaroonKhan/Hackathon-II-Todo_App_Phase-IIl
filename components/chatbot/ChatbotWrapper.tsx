"use client";

/**
 * Chatbot wrapper component that integrates with authentication.
 *
 * This component connects the chatbot to the auth context and provides
 * the user ID and token for API calls.
 * Shows authenticated chatbot when user is logged in, demo chatbot otherwise.
 */

import React, { useEffect, useState } from 'react';
import Chatbot from './index';
import DemoChatbot from './DemoChatbot';

export default function ChatbotWrapper() {
  const [user, setUser] = useState<{ id: number; email: string } | null>(null);
  const [token, setToken] = useState<string | null>(null);
  const [authChecked, setAuthChecked] = useState(false); // Track if we've checked auth status

  useEffect(() => {
    // Get user and token from localStorage (same as auth-context)
    const userData = localStorage.getItem('user');
    const tokenData = localStorage.getItem('token');

    if (userData && tokenData) {
      try {
        const parsedUser = JSON.parse(userData);
        setUser(parsedUser);
        setToken(tokenData);
      } catch (error) {
        console.error('Failed to parse user data:', error);
      }
    }

    // Listen for storage changes (login/logout events)
    const handleStorageChange = () => {
      const userData = localStorage.getItem('user');
      const tokenData = localStorage.getItem('token');

      if (userData && tokenData) {
        try {
          const parsedUser = JSON.parse(userData);
          setUser(parsedUser);
          setToken(tokenData);
        } catch (error) {
          console.error('Failed to parse user data:', error);
        }
      } else {
        setUser(null);
        setToken(null);
      }
    };

    setAuthChecked(true);
    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  // Don't render anything until we've checked auth status
  if (!authChecked) {
    return null;
  }

  // Show authenticated chatbot if user is logged in
  if (user && token) {
    return <Chatbot userId={user.id} token={token} />;
  }

  // Show demo chatbot if user is not logged in
  return <DemoChatbot />;
}
