
export enum MessageRole {
  USER = 'user',
  AI = 'ai',
}

export interface ChatMessageData {
  id: number;
  role: MessageRole;
  text: string;
  timestamp: Date;
}
