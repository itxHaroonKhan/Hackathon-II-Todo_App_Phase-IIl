/**
 * TypeScript types for the AI chatbot feature.
 *
 * These types define the structure of chat messages, requests, responses,
 * and frontend state management for the chatbot UI.
 */

/**
 * Message role enum
 */
export type MessageRole = 'user' | 'assistant';

/**
 * Individual chat message
 */
export interface ChatMessage {
  id: string;
  conversationId: string;
  role: MessageRole;
  content: string;
  timestamp: Date;
}

/**
 * Chat state for React context/hooks
 */
export interface ChatState {
  isOpen: boolean;
  messages: ChatMessage[];
  isLoading: boolean;
  conversationId: string | null;
  error: string | null;
}

/**
 * API request body for sending a chat message
 */
export interface ChatRequest {
  message: string;
  conversation_id?: string;
}

/**
 * Tool call information (returned for debugging/transparency)
 */
export interface ToolCallInfo {
  tool: string;
  params: Record<string, unknown>;
  result: unknown;
}

/**
 * API response from the chat endpoint
 */
export interface ChatResponse {
  conversation_id: string;
  response: string;
  tool_calls?: ToolCallInfo[];
}

/**
 * Current user info (from JWT)
 */
export interface CurrentUser {
  email: string;
  user_id: string;
}

/**
 * Chat actions for dispatchers
 */
export type ChatAction =
  | { type: 'OPEN_CHAT' }
  | { type: 'CLOSE_CHAT' }
  | { type: 'TOGGLE_CHAT' }
  | { type: 'SEND_MESSAGE'; payload: { content: string } }
  | { type: 'RECEIVE_MESSAGE'; payload: { content: string; conversationId: string } }
  | { type: 'SET_LOADING'; payload: boolean }
  | { type: 'SET_ERROR'; payload: string | null }
  | { type: 'SET_CONVERSATION_ID'; payload: string }
  | { type: 'LOAD_HISTORY'; payload: ChatMessage[] }
  | { type: 'CLEAR_MESSAGES' };
