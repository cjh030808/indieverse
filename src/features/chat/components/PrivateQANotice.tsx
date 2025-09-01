'use client';

import { Info, MessageCircleQuestion } from 'lucide-react';
import { ChatUser } from '@/types/chat';

interface PrivateQANoticeProps {
  currentUser: ChatUser;
  className?: string;
}

export function PrivateQANotice({ currentUser, className = '' }: PrivateQANoticeProps) {
  // 밴드 멤버는 안내문을 보지 않음
  if (currentUser.isBandMember || currentUser.isAdmin || currentUser.isModerator) {
    return null;
  }

  return (
    <div className={`bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4 ${className}`}>
      <div className="flex items-start gap-3">
        <MessageCircleQuestion className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="font-medium text-blue-900 text-sm">Private Q&A 채널</h3>
            <Info className="w-4 h-4 text-blue-500" />
          </div>
          <div className="text-sm text-blue-700 space-y-1">
            <p>• 이 채널에서는 다른 팬들의 질문을 볼 수 없습니다</p>
            <p>• 밴드 멤버만 모든 질문을 보고 답변할 수 있습니다</p>
            <p>• 밴드의 답변은 모든 팬이 볼 수 있습니다</p>
          </div>
        </div>
      </div>
    </div>
  );
}

interface PrivateQAPlaceholderProps {
  hiddenCount: number;
  className?: string;
}

export function PrivateQAPlaceholder({ hiddenCount, className = '' }: PrivateQAPlaceholderProps) {
  return (
    <div className={`flex items-center justify-center py-3 px-4 bg-gray-50 rounded-lg border border-dashed border-gray-300 my-2 ${className}`}>
      <div className="flex items-center gap-2 text-gray-500 text-sm">
        <MessageCircleQuestion className="w-4 h-4" />
        <span>{hiddenCount}개의 다른 팬 질문 (밴드만 볼 수 있음)</span>
      </div>
    </div>
  );
}