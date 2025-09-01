'use client';

import { useState } from 'react';
import { ChatMessage, ChatUser } from '@/types/chat';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { MoreHorizontal, Reply, Flag, Crown, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

interface MessageItemProps {
  message: ChatMessage;
  currentUser: ChatUser | null;
  isConsecutive?: boolean;
  onReply?: (messageId: string) => void;
  onReport?: (messageId: string) => void;
}

export function MessageItem({
  message,
  currentUser,
  isConsecutive = false,
  onReply,
  onReport
}: MessageItemProps) {
  const [showActions, setShowActions] = useState(false);
  const isOwnMessage = currentUser?.id === message.senderId;
  const isSystemMessage = message.type === 'system';
  const isAnnouncementMessage = message.type === 'announcement';

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString('ko-KR', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: false
    });
  };

  const getBadgeIcon = () => {
    if (message.isFromBand) {
      return <Crown className="w-3 h-3 text-yellow-500" />;
    }
    return null;
  };

  if (isSystemMessage) {
    return (
      <div className="flex justify-center my-2">
        <div className="bg-gray-100 px-3 py-1 rounded-full">
          <span className="text-xs text-gray-600">{message.content}</span>
        </div>
      </div>
    );
  }

  if (isAnnouncementMessage) {
    return (
      <div className="my-4 p-4 bg-blue-50 border-l-4 border-blue-500 rounded-r-lg">
        <div className="flex items-center gap-2 mb-2">
          <Crown className="w-4 h-4 text-blue-600" />
          <span className="font-semibold text-blue-900">공지사항</span>
          <span className="text-xs text-blue-600">{message.senderName}</span>
        </div>
        <p className="text-blue-800">{message.content}</p>
        <span className="text-xs text-blue-600 mt-2 block">
          {formatTime(message.timestamp)}
        </span>
      </div>
    );
  }

  return (
    <div
      className={cn(
        'group relative py-1 hover:bg-gray-50 rounded-lg px-2 transition-colors',
        isConsecutive && 'py-0.5'
      )}
      onMouseEnter={() => setShowActions(true)}
      onMouseLeave={() => setShowActions(false)}
    >
      <div className="flex gap-3">
        {/* Avatar - only show if not consecutive */}
        <div className={cn('flex-shrink-0', isConsecutive ? 'w-10' : '')}>
          {!isConsecutive && (
            <Avatar className="w-10 h-10">
              <AvatarImage src={message.senderAvatar} alt={message.senderName} />
              <AvatarFallback className="text-sm">
                {message.senderName[0]}
              </AvatarFallback>
            </Avatar>
          )}
        </div>

        {/* Message content */}
        <div className="flex-1 min-w-0">
          {/* Header - only show if not consecutive */}
          {!isConsecutive && (
            <div className="flex items-center gap-2 mb-1">
              <span className={cn(
                'font-semibold text-sm',
                message.isFromBand ? 'text-blue-600' : 'text-gray-900'
              )}>
                {message.senderName}
              </span>
              {getBadgeIcon()}
              <span className="text-xs text-gray-500">
                {formatTime(message.timestamp)}
              </span>
              {message.isEdited && (
                <span className="text-xs text-gray-400">(편집됨)</span>
              )}
            </div>
          )}

          {/* Reply indicator */}
          {message.replyTo && (
            <div className="mb-2 pl-3 border-l-2 border-gray-200">
              <span className="text-xs text-gray-500">답장</span>
            </div>
          )}

          {/* Message text */}
          <div className={cn(
            'text-sm text-gray-900 break-words',
            isConsecutive && 'ml-0'
          )}>
            {message.isDeleted ? (
              <span className="italic text-gray-500">삭제된 메시지입니다</span>
            ) : (
              message.content
            )}
          </div>

          {/* Reactions */}
          {message.reactions && message.reactions.length > 0 && (
            <div className="flex gap-1 mt-2">
              {message.reactions.map((reaction, index) => (
                <button
                  key={index}
                  className="flex items-center gap-1 px-2 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-xs transition-colors"
                >
                  <span>{reaction.emoji}</span>
                  <span className="text-gray-600">1</span>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Message actions */}
        {showActions && !message.isDeleted && (
          <div className="flex items-start gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
            {onReply && (
              <button
                onClick={() => onReply(message.id)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                title="답장"
              >
                <Reply className="w-4 h-4 text-gray-500" />
              </button>
            )}
            
            {!isOwnMessage && onReport && (
              <button
                onClick={() => onReport(message.id)}
                className="p-1 hover:bg-gray-200 rounded transition-colors"
                title="신고"
              >
                <Flag className="w-4 h-4 text-gray-500" />
              </button>
            )}
            
            <button
              className="p-1 hover:bg-gray-200 rounded transition-colors"
              title="더보기"
            >
              <MoreHorizontal className="w-4 h-4 text-gray-500" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}