import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { 
  ChatMessage, 
  ChatChannel, 
  ChatUser, 
  SendMessagePayload,
  ChatState 
} from '@/types/chat';

// Mock data for development
const mockChannels: ChatChannel[] = [
  {
    id: '1',
    name: '일반 채팅',
    description: '팬들이 자유롭게 대화할 수 있는 공간입니다',
    type: 'community',
    isActive: true,
    memberCount: 247,
    bandOnly: false,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '2',
    name: '공지사항',
    description: '밴드의 중요한 소식을 전달하는 채널입니다',
    type: 'announcement',
    isActive: true,
    memberCount: 312,
    bandOnly: true,
    createdAt: '2024-01-01T00:00:00Z'
  },
  {
    id: '3',
    name: 'Private Q&A',
    description: '밴드에게 개인적인 질문을 할 수 있는 공간입니다',
    type: 'private_qa',
    isActive: true,
    memberCount: 189,
    bandOnly: false,
    createdAt: '2024-01-01T00:00:00Z'
  }
];

const mockMessages: ChatMessage[] = [
  {
    id: '1',
    content: '안녕하세요! 새로운 앨범 소식 기대해주세요 🎵',
    senderId: 'band-1',
    senderName: '보컬 김민수',
    senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    timestamp: '2024-08-31T10:30:00Z',
    type: 'text',
    isFromBand: true,
    channelId: '2',
    isEdited: false,
    isDeleted: false
  },
  {
    id: '2',
    content: '와!! 정말 기대돼요! 언제쯤 발매 예정인가요?',
    senderId: 'fan-1',
    senderName: '팬1',
    timestamp: '2024-08-31T10:32:00Z',
    type: 'text',
    isFromBand: false,
    channelId: '1',
    isEdited: false,
    isDeleted: false
  },
  {
    id: '3',
    content: '저도 너무 궁금해요! 컨셉은 어떤 느낌일까요? 🤔',
    senderId: 'fan-2',
    senderName: '팬2',
    timestamp: '2024-08-31T10:35:00Z',
    type: 'text',
    isFromBand: false,
    channelId: '1',
    replyTo: '2',
    isEdited: false,
    isDeleted: false
  },
  {
    id: '4',
    content: '안녕하세요! Private Q&A 채널에 오신 걸 환영합니다. 궁금한 것이 있으시면 언제든지 질문해주세요! 😊',
    senderId: 'band-1',
    senderName: '보컬 김민수',
    senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    timestamp: '2024-08-31T09:00:00Z',
    type: 'text',
    isFromBand: true,
    channelId: '3',
    isEdited: false,
    isDeleted: false
  },
  {
    id: '5',
    content: '혹시 다음 콘서트는 언제쯤 계획하고 계신가요?',
    senderId: 'fan-3',
    senderName: '팬3',
    timestamp: '2024-08-31T09:15:00Z',
    type: 'text',
    isFromBand: false,
    channelId: '3',
    isEdited: false,
    isDeleted: false,
    isPrivate: true
  },
  {
    id: '6',
    content: '좋은 질문이네요! 아직 확정되지 않았지만 10월 말쯤 계획하고 있어요. 곧 공식 발표할게요! 🎤',
    senderId: 'band-1',
    senderName: '보컬 김민수',
    senderAvatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=40&h=40&fit=crop&crop=face',
    timestamp: '2024-08-31T09:20:00Z',
    type: 'text',
    isFromBand: true,
    channelId: '3',
    replyTo: '5',
    isEdited: false,
    isDeleted: false
  },
  {
    id: '7',
    content: '밴드 멤버 분들 중에 누가 가장 먼저 일어나시나요? ㅎㅎ',
    senderId: 'fan-4',
    senderName: '팬4',
    timestamp: '2024-08-31T09:45:00Z',
    type: 'text',
    isFromBand: false,
    channelId: '3',
    isEdited: false,
    isDeleted: false,
    isPrivate: true
  }
];

const mockCurrentUser: ChatUser = {
  id: 'current-user',
  name: '나',
  isBandMember: false,
  isAdmin: false,
  isModerator: false,
  joinedAt: '2024-08-01T00:00:00Z',
  isOnline: true,
  lastSeen: '2024-08-31T11:00:00Z'
};

// API functions (mock implementations)
const fetchChannels = async (): Promise<ChatChannel[]> => {
  await new Promise(resolve => setTimeout(resolve, 500));
  return mockChannels;
};

const fetchMessages = async (channelId: string): Promise<ChatMessage[]> => {
  await new Promise(resolve => setTimeout(resolve, 300));
  return mockMessages.filter(msg => msg.channelId === channelId);
};

const sendMessage = async (payload: SendMessagePayload): Promise<ChatMessage> => {
  await new Promise(resolve => setTimeout(resolve, 200));
  
  const newMessage: ChatMessage = {
    id: Date.now().toString(),
    content: payload.content,
    senderId: mockCurrentUser.id,
    senderName: mockCurrentUser.name,
    timestamp: new Date().toISOString(),
    type: payload.type,
    isFromBand: mockCurrentUser.isBandMember,
    channelId: payload.channelId,
    replyTo: payload.replyTo,
    isEdited: false,
    isDeleted: false
  };
  
  return newMessage;
};

// Custom hooks
export function useChannels() {
  return useQuery({
    queryKey: ['chat-channels'],
    queryFn: fetchChannels,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

export function useMessages(channelId: string) {
  return useQuery({
    queryKey: ['chat-messages', channelId],
    queryFn: () => fetchMessages(channelId),
    enabled: !!channelId,
    staleTime: 30 * 1000, // 30 seconds
  });
}

export function useSendMessage() {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: sendMessage,
    onSuccess: (newMessage) => {
      // Add the new message to the cache
      queryClient.setQueryData(
        ['chat-messages', newMessage.channelId],
        (oldMessages: ChatMessage[] = []) => [...oldMessages, newMessage]
      );
    },
  });
}

export function useChat(initialChannelId?: string) {
  const [activeChannelId, setActiveChannelId] = useState<string>(initialChannelId || '1');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  
  const { data: channels, isLoading: channelsLoading } = useChannels();
  const { data: messages, isLoading: messagesLoading } = useMessages(activeChannelId);
  const sendMessageMutation = useSendMessage();
  
  // Simulate WebSocket connection
  useEffect(() => {
    const timer = setTimeout(() => setIsConnected(true), 1000);
    return () => clearTimeout(timer);
  }, []);
  
  const handleSendMessage = useCallback(
    (content: string, type: ChatMessage['type'] = 'text', replyTo?: string) => {
      if (!content.trim() || !activeChannelId) return;
      
      sendMessageMutation.mutate({
        content: content.trim(),
        channelId: activeChannelId,
        type,
        replyTo
      });
    },
    [activeChannelId, sendMessageMutation]
  );
  
  const handleChannelSwitch = useCallback((channelId: string) => {
    setActiveChannelId(channelId);
  }, []);
  
  const currentChannel = channels?.find(ch => ch.id === activeChannelId);
  
  return {
    // Data
    channels: channels || [],
    messages: messages || [],
    currentChannel,
    currentUser: mockCurrentUser,
    activeChannelId,
    
    // State
    isLoading: channelsLoading || messagesLoading,
    isConnected,
    isSending: sendMessageMutation.isPending,
    
    // Actions
    sendMessage: handleSendMessage,
    switchChannel: handleChannelSwitch,
    
    // Utils
    canSendMessage: isConnected && !sendMessageMutation.isPending,
  };
}