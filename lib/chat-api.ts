/**
 * API client for chat functionality.
 *
 * Handles communication with the backend chat endpoint.
 */

import { ChatRequest, ChatResponse } from '@/components/chatbot/types';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'https://itxharoon-Todo_ChatBoot.hf.space/api';

export class ChatAPIError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public details?: any
  ) {
    super(message);
    this.name = 'ChatAPIError';
  }
}

/**
 * Send a chat message to the AI assistant.
 *
 * @param userId - User ID from JWT
 * @param request - Chat request with message and optional conversation_id
 * @param token - JWT token for authentication
 * @returns Chat response with conversation_id and AI response
 * @throws ChatAPIError if request fails
 */
export async function sendChatMessage(
  userId: number,
  request: ChatRequest,
  token: string
): Promise<ChatResponse> {
  try {
    // ❌ BUG: API endpoint was incorrect, missing leading slash
    // ✅ FIX: Ensure correct API endpoint format
    const response = await fetch(`${API_BASE_URL}/${userId}/chat`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`,
      },
      body: JSON.stringify(request),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ChatAPIError(
        errorData.detail || `Request failed with status ${response.status}`,
        response.status,
        errorData
      );
    }

    const data: ChatResponse = await response.json();
    
    return data;
  } catch (error) {
    if (error instanceof ChatAPIError) {
      throw error;
    }

    throw new ChatAPIError(
      `Failed to send message: ${error instanceof Error ? error.message : 'Unknown error'}`,
      undefined,
      error
    );
  }
}

/**
 * List conversations for a user.
 *
 * @param userId - User ID from JWT
 * @param token - JWT token for authentication
 * @returns List of conversations
 * @throws ChatAPIError if request fails
 */
export async function listConversations(
  userId: number,
  token: string
): Promise<any[]> {
  try {
    const response = await fetch(`${API_BASE_URL}/${userId}/conversations`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new ChatAPIError(
        errorData.detail || `Request failed with status ${response.status}`,
        response.status,
        errorData
      );
    }

    return await response.json();
  } catch (error) {
    if (error instanceof ChatAPIError) {
      throw error;
    }

    throw new ChatAPIError(
      `Failed to list conversations: ${error instanceof Error ? error.message : 'Unknown error'}`,
      undefined,
      error
    );
  }
}
