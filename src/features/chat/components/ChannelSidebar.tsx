'use client';

import { ChatChannel, ChatUser } from '@/types/chat';
import { Hash, Volume2, Users, Crown, MessageCircleQuestion } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ChannelSidebarProps {
  channels: ChatChannel[];
  activeChannelId: string;
  currentUser: ChatUser | null;
  onChannelSelect: (channelId: string) => void;
  className?: string;
}

const getChannelIcon = (type: ChatChannel['type']) => {
  switch (type) {
    case 'community':
      return <Hash className="w-4 h-4" />;
    case 'announcement':
      return <Volume2 className="w-4 h-4" />;
    case 'qa':
      return <Users className="w-4 h-4" />;
    case 'private_qa':
      return <MessageCircleQuestion className="w-4 h-4" />;
    default:
      return <Hash className="w-4 h-4" />;
  }
};

export function ChannelSidebar({
  channels,
  activeChannelId,
  currentUser,
  onChannelSelect,
  className
}: ChannelSidebarProps) {
  const canAccessChannel = (channel: ChatChannel) => {
    if (!channel.bandOnly) return true;
    return currentUser?.isBandMember || currentUser?.isAdmin || currentUser?.isModerator;
  };

  return (
    <div className={cn('bg-gray-50 border-r border-gray-200', className)}>
      <div className="p-4 border-b border-gray-200">
        <h2 className="font-semibold text-gray-900 flex items-center gap-2">
          <Users className="w-5 h-5" />
          채팅 채널
        </h2>
        <p className="text-sm text-gray-500 mt-1">팬들과 소통하는 공간</p>
      </div>

      <div className="p-2">
        <div className="space-y-1">
          {channels.map((channel) => {
            const isActive = channel.id === activeChannelId;
            const canAccess = canAccessChannel(channel);
            
            if (!canAccess) {
              return (
                <div
                  key={channel.id}
                  className="px-3 py-2 rounded-lg text-gray-400 cursor-not-allowed flex items-center gap-3"
                >
                  {getChannelIcon(channel.type)}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium truncate">{channel.name}</span>
                      <Crown className="w-3 h-3" />
                    </div>
                    <p className="text-xs text-gray-400 truncate">밴드 전용 채널</p>
                  </div>
                </div>
              );
            }

            return (
              <button
                key={channel.id}
                onClick={() => onChannelSelect(channel.id)}
                className={cn(
                  'w-full px-3 py-2 rounded-lg text-left hover:bg-gray-100 transition-colors flex items-center gap-3',
                  isActive && 'bg-blue-100 text-blue-700 hover:bg-blue-100'
                )}
              >
                <div className={cn(
                  'flex-shrink-0',
                  isActive ? 'text-blue-600' : 'text-gray-500'
                )}>
                  {getChannelIcon(channel.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <span className="text-sm font-medium truncate">{channel.name}</span>
                    {channel.bandOnly && (
                      <Crown className="w-3 h-3 text-yellow-500" />
                    )}
                  </div>
                  <div className="flex items-center gap-2 mt-1">
                    <span className="text-xs text-gray-500">
                      {channel.memberCount}명
                    </span>
                    {channel.lastMessage && (
                      <span className="text-xs text-gray-400 truncate">
                        {channel.lastMessage.content.slice(0, 20)}...
                      </span>
                    )}
                  </div>
                </div>
                
                {!channel.isActive && (
                  <div className="w-2 h-2 bg-gray-400 rounded-full flex-shrink-0" />
                )}
              </button>
            );
          })}
        </div>

        {/* Channel Info */}
        {activeChannelId && (
          <div className="mt-6 p-3 bg-blue-50 rounded-lg">
            {channels.find(ch => ch.id === activeChannelId) && (
              <>
                <h3 className="font-medium text-blue-900 text-sm">
                  {channels.find(ch => ch.id === activeChannelId)?.name}
                </h3>
                <p className="text-blue-700 text-xs mt-1">
                  {channels.find(ch => ch.id === activeChannelId)?.description}
                </p>
                <div className="flex items-center gap-4 mt-2 text-xs text-blue-600">
                  <span>
                    멤버 {channels.find(ch => ch.id === activeChannelId)?.memberCount}명
                  </span>
                  <span>
                    {channels.find(ch => ch.id === activeChannelId)?.type === 'announcement' 
                      ? '공지 전용' 
                      : channels.find(ch => ch.id === activeChannelId)?.type === 'private_qa'
                      ? 'Private Q&A'
                      : '자유 채팅'
                    }
                  </span>
                </div>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}