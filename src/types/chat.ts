export interface ChatMessage {
  id: string;
  content: string;
  senderId: string;
  senderName: string;
  senderAvatar?: string;
  timestamp: string;
  type: 'text' | 'emoji' | 'system' | 'announcement';
  isFromBand: boolean;
  channelId: string;
  replyTo?: string;
  reactions?: ChatReaction[];
  isEdited: boolean;
  isDeleted: boolean;
  isPrivate?: boolean;
  visibleToUserIds?: string[];
}

export interface ChatReaction {
  emoji: string;
  userId: string;
  userName: string;
  timestamp: string;
}

export interface ChatChannel {
  id: string;
  name: string;
  description: string;
  type: 'community' | 'announcement' | 'qa' | 'private_qa';
  isActive: boolean;
  memberCount: number;
  lastMessage?: ChatMessage;
  bandOnly: boolean;
  createdAt: string;
}

export interface ChatUser {
  id: string;
  name: string;
  avatar?: string;
  isBandMember: boolean;
  isAdmin: boolean;
  isModerator: boolean;
  joinedAt: string;
  isOnline: boolean;
  lastSeen: string;
}

export interface ChatReport {
  id: string;
  messageId: string;
  reporterId: string;
  reason: 'spam' | 'inappropriate' | 'harassment' | 'other';
  description: string;
  status: 'pending' | 'resolved' | 'dismissed';
  createdAt: string;
  resolvedAt?: string;
  resolvedBy?: string;
}

export interface ChatModeration {
  bannedUsers: string[];
  mutedUsers: { userId: string; until: string }[];
  bannedWords: string[];
  slowModeSeconds: number;
  isEnabled: boolean;
}

export interface ChatState {
  messages: ChatMessage[];
  channels: ChatChannel[];
  activeChannelId: string;
  currentUser: ChatUser | null;
  onlineUsers: ChatUser[];
  isLoading: boolean;
  error: string | null;
  isConnected: boolean;
}

export interface SendMessagePayload {
  content: string;
  channelId: string;
  type: ChatMessage['type'];
  replyTo?: string;
}

export interface ChatNotification {
  id: string;
  type: 'new_message' | 'mention' | 'announcement' | 'qa_started' | 'private_qa_response';
  title: string;
  message: string;
  channelId: string;
  timestamp: string;
  isRead: boolean;
}

export interface MessageVisibility {
  canViewMessage: (message: ChatMessage, currentUser: ChatUser) => boolean;
  filterMessagesForUser: (messages: ChatMessage[], currentUser: ChatUser) => ChatMessage[];
}