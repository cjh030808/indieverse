'use client';

import { useState } from 'react';
import { ChatReport, ChatUser } from '@/types/chat';
import { Shield, Flag, Ban, MessageSquare, Search } from 'lucide-react';
import { cn } from '@/lib/utils';

interface ModerationPanelProps {
  reports: ChatReport[];
  users: ChatUser[];
  currentUser: ChatUser | null;
  onResolveReport: (reportId: string, action: 'resolve' | 'dismiss') => void;
  onBanUser: (userId: string, reason: string) => void;
  onMuteUser: (userId: string, duration: number) => void;
  className?: string;
}

export function ModerationPanel({
  reports,
  users,
  currentUser,
  onResolveReport,
  onBanUser,
  onMuteUser,
  className
}: ModerationPanelProps) {
  const [activeTab, setActiveTab] = useState<'reports' | 'users'>('reports');
  const [searchTerm, setSearchTerm] = useState('');

  // Only show to moderators and band members
  if (!currentUser?.isModerator && !currentUser?.isBandMember && !currentUser?.isAdmin) {
    return null;
  }

  const pendingReports = reports.filter(r => r.status === 'pending');
  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getReasonLabel = (reason: ChatReport['reason']) => {
    const labels = {
      spam: '스팸',
      inappropriate: '부적절한 내용',
      harassment: '괴롭힘',
      other: '기타'
    };
    return labels[reason];
  };

  const getStatusColor = (status: ChatReport['status']) => {
    switch (status) {
      case 'pending': return 'text-yellow-600 bg-yellow-50';
      case 'resolved': return 'text-green-600 bg-green-50';
      case 'dismissed': return 'text-gray-600 bg-gray-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div className={cn('bg-white border border-gray-200 rounded-lg shadow-sm', className)}>
      {/* Header */}
      <div className="p-4 border-b border-gray-200">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-blue-600" />
          <h2 className="font-semibold text-gray-900">모더레이션 패널</h2>
          {pendingReports.length > 0 && (
            <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
              {pendingReports.length}개 대기
            </span>
          )}
        </div>

        {/* Tabs */}
        <div className="flex gap-1">
          <button
            onClick={() => setActiveTab('reports')}
            className={cn(
              'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              activeTab === 'reports'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            )}
          >
            신고 관리 ({pendingReports.length})
          </button>
          <button
            onClick={() => setActiveTab('users')}
            className={cn(
              'px-3 py-2 rounded-lg text-sm font-medium transition-colors',
              activeTab === 'users'
                ? 'bg-blue-100 text-blue-700'
                : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
            )}
          >
            사용자 관리
          </button>
        </div>
      </div>

      <div className="p-4">
        {activeTab === 'reports' && (
          <div className="space-y-4">
            {pendingReports.length === 0 ? (
              <div className="text-center py-8">
                <Flag className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500">처리할 신고가 없습니다</p>
              </div>
            ) : (
              pendingReports.map((report) => (
                <div
                  key={report.id}
                  className="border border-gray-200 rounded-lg p-4"
                >
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <span className={cn(
                        'inline-flex items-center px-2 py-1 rounded-full text-xs font-medium',
                        getStatusColor(report.status)
                      )}>
                        {getReasonLabel(report.reason)}
                      </span>
                      <p className="text-sm text-gray-600 mt-1">
                        신고 시간: {new Date(report.createdAt).toLocaleString('ko-KR')}
                      </p>
                    </div>
                  </div>

                  {report.description && (
                    <div className="bg-gray-50 rounded p-3 mb-3">
                      <p className="text-sm text-gray-700">{report.description}</p>
                    </div>
                  )}

                  <div className="flex gap-2">
                    <button
                      onClick={() => onResolveReport(report.id, 'resolve')}
                      className="px-3 py-1 bg-green-600 text-white text-sm rounded hover:bg-green-700 transition-colors"
                    >
                      해결됨
                    </button>
                    <button
                      onClick={() => onResolveReport(report.id, 'dismiss')}
                      className="px-3 py-1 bg-gray-600 text-white text-sm rounded hover:bg-gray-700 transition-colors"
                    >
                      기각
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'users' && (
          <div className="space-y-4">
            {/* Search */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="사용자 검색..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Users list */}
            <div className="space-y-2 max-h-96 overflow-y-auto">
              {filteredUsers.map((user) => (
                <div
                  key={user.id}
                  className="flex items-center justify-between p-3 border border-gray-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium">{user.name[0]}</span>
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm font-medium">{user.name}</span>
                        {user.isBandMember && <Shield className="w-3 h-3 text-blue-500" />}
                        {user.isModerator && <Flag className="w-3 h-3 text-green-500" />}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-gray-500">
                        <span className={cn(
                          "w-2 h-2 rounded-full",
                          user.isOnline ? "bg-green-500" : "bg-gray-300"
                        )} />
                        {user.isOnline ? '온라인' : `마지막 접속: ${new Date(user.lastSeen).toLocaleDateString('ko-KR')}`}
                      </div>
                    </div>
                  </div>

                  {!user.isBandMember && !user.isAdmin && (
                    <div className="flex gap-2">
                      <button
                        onClick={() => onMuteUser(user.id, 10 * 60 * 1000)} // 10 minutes
                        className="px-2 py-1 text-xs bg-yellow-600 text-white rounded hover:bg-yellow-700 transition-colors"
                        title="10분 뮤트"
                      >
                        <MessageSquare className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() => onBanUser(user.id, '스팸 또는 부적절한 행동')}
                        className="px-2 py-1 text-xs bg-red-600 text-white rounded hover:bg-red-700 transition-colors"
                        title="차단"
                      >
                        <Ban className="w-3 h-3" />
                      </button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}