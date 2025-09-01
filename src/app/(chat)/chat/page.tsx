'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { ChatRoom } from '@/features/chat/components/ChatRoom';
import { ModerationPanel } from '@/features/chat/components/ModerationPanel';
import { useChat } from '@/features/chat/hooks/useChat';
import { ChatReport } from '@/types/chat';
import { Settings, Shield } from 'lucide-react';
import { cn } from '@/lib/utils';

// Mock moderation data
const mockReports: ChatReport[] = [
  {
    id: '1',
    messageId: 'msg-1',
    reporterId: 'user-1',
    reason: 'spam',
    description: '같은 메시지를 반복해서 보내고 있습니다.',
    status: 'pending',
    createdAt: '2024-08-31T10:00:00Z'
  },
  {
    id: '2',
    messageId: 'msg-2',
    reporterId: 'user-2',
    reason: 'inappropriate',
    description: '부적절한 언어를 사용하고 있습니다.',
    status: 'pending',
    createdAt: '2024-08-31T09:30:00Z'
  }
];

export default function ChatPage() {
  const [showModerationPanel, setShowModerationPanel] = useState(false);
  const { currentUser } = useChat();

  const handleResolveReport = (reportId: string, action: 'resolve' | 'dismiss') => {
    console.log(`${action} report:`, reportId);
    // TODO: Implement report resolution
  };

  const handleBanUser = (userId: string, reason: string) => {
    console.log('Ban user:', userId, 'Reason:', reason);
    // TODO: Implement user banning
  };

  const handleMuteUser = (userId: string, duration: number) => {
    console.log('Mute user:', userId, 'Duration:', duration);
    // TODO: Implement user muting
  };

  const canModerate = currentUser?.isModerator || currentUser?.isBandMember || currentUser?.isAdmin;

  return (
    <>
      {/* Page Title */}
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Chat & Messaging</h1>
            <p className="text-gray-600 mt-2">팬들과 실시간으로 소통하세요</p>
          </div>

          <div className="flex items-center gap-2">
            {canModerate && (
              <button
                onClick={() => setShowModerationPanel(!showModerationPanel)}
                className={cn(
                  "flex items-center gap-2 px-4 py-2 rounded-lg transition-colors",
                  showModerationPanel
                    ? "bg-blue-100 text-blue-700"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                )}
              >
                <Shield className="w-4 h-4" />
                모더레이션
              </button>
            )}

            <button className="flex items-center gap-2 px-4 py-2 bg-gray-100 text-gray-600 hover:bg-gray-200 rounded-lg transition-colors">
              <Settings className="w-4 h-4" />
              설정
            </button>
          </div>
        </div>
      </div>

      {/* Chat Section */}
      <Card className="p-6 h-[calc(100vh-16rem)]">
        <div className="h-full flex gap-6">
          {/* Main Chat Room */}
          <div className="flex-1">
            <ChatRoom className="h-full" />
          </div>

          {/* Moderation Panel */}
          {showModerationPanel && canModerate && (
            <div className="w-80 flex-shrink-0">
              <ModerationPanel
                reports={mockReports}
                users={[]} // This would come from useChat hook in a real implementation
                currentUser={currentUser}
                onResolveReport={handleResolveReport}
                onBanUser={handleBanUser}
                onMuteUser={handleMuteUser}
                className="h-full"
              />
            </div>
          )}
        </div>
      </Card>

      {/* Chat Guidelines */}
      {/* <div className="mt-8">
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-4">채팅 가이드라인</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
            <div>
              <strong className="text-gray-900">존중하는 대화:</strong> 모든 팬들을 존중하며 긍정적인 분위기를 만들어주세요.
            </div>
            <div>
              <strong className="text-gray-900">스팸 금지:</strong> 같은 메시지의 반복이나 광고성 내용은 삼가해주세요.
            </div>
            <div>
              <strong className="text-gray-900">저작권 준수:</strong> 공식 로고나 이미지의 무단 사용을 금지합니다.
            </div>
          </div>
        </Card>
      </div> */}
    </>
  );
}