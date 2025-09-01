'use client';

import { useEffect, useRef } from 'react';
import { ChatMessage, ChatUser, ChatChannel } from '@/types/chat';
import { MessageItem } from './MessageItem';
import { PrivateQANotice, PrivateQAPlaceholder } from './PrivateQANotice';
import { filterMessagesForUser, getPrivateQAMessagePlaceholder, shouldShowPrivateQANotice } from '../utils/messageVisibility';
import { cn } from '@/lib/utils';

interface MessageListProps {
  messages: ChatMessage[];
  currentUser: ChatUser | null;
  channel: ChatChannel | null;
  isLoading: boolean;
  onReply?: (messageId: string) => void;
  onReport?: (messageId: string) => void;
  className?: string;
}

export function MessageList({
  messages,
  currentUser,
  channel,
  isLoading,
  onReply,
  onReport,
  className
}: MessageListProps) {
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isInitialLoad = useRef(true);

  // Filter messages based on visibility rules
  const filteredMessages = currentUser && channel 
    ? filterMessagesForUser(messages, currentUser, channel)
    : messages;

  // Get placeholder info for hidden messages
  const hiddenMessageCount = currentUser && channel 
    ? getPrivateQAMessagePlaceholder(messages.length, filteredMessages.length, currentUser)
    : null;

  // Auto scroll to bottom when new messages arrive
  useEffect(() => {
    if (messagesEndRef.current && containerRef.current && !isInitialLoad.current) {
      const container = containerRef.current;
      const isNearBottom = container.scrollTop + container.clientHeight >= container.scrollHeight - 100;
      
      if (isNearBottom) {
        messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
      }
    }
    
    // Mark initial load as complete
    if (isInitialLoad.current && filteredMessages.length > 0) {
      isInitialLoad.current = false;
    }
  }, [filteredMessages]);

  if (isLoading) {
    return (
      <div className={cn('flex-1 flex items-center justify-center', className)}>
        <div className="text-center">
          <div className="animate-spin w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full mx-auto mb-4"></div>
          <p className="text-gray-500">메시지를 불러오는 중...</p>
        </div>
      </div>
    );
  }

  if (filteredMessages.length === 0) {
    return (
      <div className={cn('flex-1 flex items-center justify-center', className)}>
        <div className="text-center">
          <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <span className="text-2xl">💬</span>
          </div>
          <h3 className="font-medium text-gray-900 mb-2">아직 메시지가 없습니다</h3>
          <p className="text-gray-500 text-sm">첫 번째 메시지를 보내보세요!</p>
        </div>
      </div>
    );
  }

  const groupMessagesByDate = (messages: ChatMessage[]) => {
    const groups: { [date: string]: ChatMessage[] } = {};
    
    messages.forEach(message => {
      const date = new Date(message.timestamp).toDateString();
      if (!groups[date]) {
        groups[date] = [];
      }
      groups[date].push(message);
    });
    
    return groups;
  };

  const messageGroups = groupMessagesByDate(filteredMessages);
  const today = new Date().toDateString();
  const yesterday = new Date(Date.now() - 24 * 60 * 60 * 1000).toDateString();

  const formatDateHeader = (dateString: string) => {
    if (dateString === today) return '오늘';
    if (dateString === yesterday) return '어제';
    return new Date(dateString).toLocaleDateString('ko-KR', {
      month: 'long',
      day: 'numeric',
      weekday: 'long'
    });
  };

  return (
    <div 
      ref={containerRef}
      className={cn('flex-1 overflow-y-auto p-4 space-y-1', className)}
    >
      {/* Private Q&A Notice */}
      {currentUser && channel && shouldShowPrivateQANotice(channel, currentUser) && (
        <PrivateQANotice currentUser={currentUser} />
      )}

      {/* Hidden messages placeholder */}
      {hiddenMessageCount && (
        <PrivateQAPlaceholder hiddenCount={parseInt(hiddenMessageCount.split('개')[0])} />
      )}
      {Object.entries(messageGroups).map(([date, groupMessages]) => (
        <div key={date}>
          {/* Date separator */}
          <div className="flex items-center justify-center my-4">
            <div className="bg-gray-100 px-3 py-1 rounded-full">
              <span className="text-xs text-gray-600 font-medium">
                {formatDateHeader(date)}
              </span>
            </div>
          </div>

          {/* Messages for this date */}
          {groupMessages.map((message, index) => {
            const prevMessage = index > 0 ? groupMessages[index - 1] : null;
            const isConsecutive = 
              prevMessage &&
              prevMessage.senderId === message.senderId &&
              new Date(message.timestamp).getTime() - new Date(prevMessage.timestamp).getTime() < 5 * 60 * 1000; // 5 minutes

            return (
              <MessageItem
                key={message.id}
                message={message}
                currentUser={currentUser}
                isConsecutive={isConsecutive}
                onReply={onReply}
                onReport={onReport}
              />
            );
          })}
        </div>
      ))}
      
      <div ref={messagesEndRef} />
    </div>
  );
}