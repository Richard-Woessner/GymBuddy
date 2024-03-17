export interface Message {
  senderUid: string;
  message: string;
  timestamp: Date;
}

export interface Conversation {
  id?: string;
  userUids: string[];
  messages: Message[];
  createdAt: Date;
  updatedAt: Date;
}
