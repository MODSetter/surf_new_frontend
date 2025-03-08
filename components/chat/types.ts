/**
 * Types for chat components
 */

export type Source = {
  id: number;
  title: string;
  description: string;
  url: string;
  connectorType?: string;
};

export type Connector = {
  type: string;
  name: string;
  sources: Source[];
};

export type StatusMessage = {
  id: number;
  message: string;
  type: 'info' | 'success' | 'error' | 'warning';
  timestamp: string;
};

export type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp?: string;
};

export type ResearchMode = 'general' | 'deep' | 'deeper' | 'deepest'; 