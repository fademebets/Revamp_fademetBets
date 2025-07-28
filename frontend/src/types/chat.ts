export interface ChatRoom {
  userId: string;
  email?: string;
  lastMessage: string;
  lastUpdated: string;
}

export interface Message {
  senderId: string;
  senderType: 'admin' | 'user';
  receiverId: string;
  message: string;
  createdAt: string;
}

export interface MessagePayload {
  senderId: string;
  senderType: 'admin' | 'user';
  receiverId: string;
  message: string;
}

export interface SocketAuthData {
  token: string;
}
