'use client';

import { useState } from 'react';
import { useChat } from '../hooks/useChat';
import { ChannelSidebar } from './ChannelSidebar';
import { MessageList } from './MessageList';
import { MessageInput } from './MessageInput';
import { ChatMessage } from '@/types/chat';
import { cn } from '@/lib/utils';

interface ChatRoomProps {
  className?: string;
}

export function ChatRoom({ className }: ChatRoomProps) {
  const {
    channels,
    messages,
    currentChannel,
    currentUser,
    activeChannelId,
    isLoading,
    isConnected,
    isSending,
    sendMessage,
    switchChannel,
    canSendMessage
  } = useChat();

  const [replyTo, setReplyTo] = useState<{ 
    id: string; 
    senderName: string; 
    content: string; 
  } | undefined>();

  const handleReply = (messageId: string) => {
    const message = messages.find(m => m.id === messageId);
    if (message) {
      setReplyTo({
        id: message.id,
        senderName: message.senderName,
        content: message.content
      });
    }
  };

  const handleCancelReply = () => {
    setReplyTo(undefined);
  };

  const handleSendMessage = (content: string, type?: ChatMessage['type'], replyToId?: string) => {
    sendMessage(content, type, replyToId);
    setReplyTo(undefined);
  };

  const handleReport = (messageId: string) => {
    // TODO: Implement report functionality
    console.log('Report message:', messageId);
  };

  const canSendInCurrentChannel = () => {
    if (!currentChannel || !currentUser) return false;
    
    // Announcement channels are band-only for sending
    if (currentChannel.type === 'announcement') {
      return currentUser.isBandMember || currentUser.isAdmin;
    }
    
    return canSendMessage;
  };

  return (
    <div className={cn('flex h-full bg-white rounded-lg border border-gray-200 overflow-hidden', className)}>
      {/* Channel Sidebar */}
      <div className="w-80 flex-shrink-0">
        <ChannelSidebar
          channels={channels}
          activeChannelId={activeChannelId}
          currentUser={currentUser}
          onChannelSelect={switchChannel}
          className="h-full"
        />
      </div>

      {/* Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Channel Header */}
        <div className="p-4 border-b border-gray-200 bg-gray-50">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="font-semibold text-gray-900 text-lg">
                {currentChannel?.name}
              </h2>
              <p className="text-sm text-gray-600">
                {currentChannel?.description}
              </p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className={cn(
                "w-2 h-2 rounded-full",
                isConnected ? "bg-green-500" : "bg-red-500"
              )} />
              <span className="text-sm text-gray-600">
                {isConnected ? "연결됨" : "연결 중..."}
              </span>
            </div>
          </div>
        </div>

        {/* Messages */}
        <MessageList
          messages={messages}
          currentUser={currentUser}
          channel={currentChannel}
          isLoading={isLoading}
          onReply={handleReply}
          onReport={handleReport}
          className="flex-1"
        />

        {/* Message Input */}
        <MessageInput
          onSendMessage={handleSendMessage}
          canSendMessage={canSendInCurrentChannel()}
          isSending={isSending}
          replyTo={replyTo}
          onCancelReply={handleCancelReply}
          placeholder={
            currentChannel?.type === 'announcement'
              ? currentUser?.isBandMember
                ? "공지사항을 입력하세요..."
                : "공지사항 채널입니다"
              : currentChannel?.type === 'private_qa'
              ? "밴드에게 질문하세요..."
              : "메시지를 입력하세요..."
          }
        />
      </div>
    </div>
  );
}