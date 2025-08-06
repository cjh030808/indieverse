'use client';

import { Story } from '@/types/story';
import { cn } from '@/lib/utils';
import { X, Heart, MessageCircle, Calendar, User, Music, Image as ImageIcon, Video, Megaphone, FileText } from 'lucide-react';
import { format, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';
import { useEffect } from 'react';

interface StoryModalProps {
  story: Story | null;
  isOpen: boolean;
  onClose: () => void;
}

// Story type icons and colors
const STORY_TYPE_CONFIG = {
  story: {
    icon: FileText,
    color: 'from-purple-500 to-purple-600',
    bgColor: 'bg-purple-500/20',
    label: '스토리'
  },
  announcement: {
    icon: Megaphone,
    color: 'from-red-500 to-red-600',
    bgColor: 'bg-red-500/20',
    label: '공지사항'
  },
  photo: {
    icon: ImageIcon,
    color: 'from-pink-500 to-pink-600',
    bgColor: 'bg-pink-500/20',
    label: '사진'
  },
  video: {
    icon: Video,
    color: 'from-blue-500 to-blue-600',
    bgColor: 'bg-blue-500/20',
    label: '비디오'
  }
};

export function StoryModal({ story, isOpen, onClose }: StoryModalProps) {
  // Handle escape key press
  useEffect(() => {
    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleEscapeKey);
      // Prevent body scrolling when modal is open
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.removeEventListener('keydown', handleEscapeKey);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !story) return null;

  const storyDate = new Date(story.timestamp);
  const typeConfig = STORY_TYPE_CONFIG[story.type || 'story'];
  const TypeIcon = typeConfig.icon;

  const formatDateTime = (date: Date) => {
    if (!isValid(date)) return '날짜 정보 없음';
    return format(date, 'yyyy년 MM월 dd일 HH:mm', { locale: ko });
  };

  const formatDayOfWeek = (date: Date) => {
    if (!isValid(date)) return '';
    return format(date, 'EEEE', { locale: ko });
  };

  return (
    <div className="fixed inset-0 z-50">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity"
        onClick={onClose}
        aria-hidden="true"
      />

      {/* Modal Container */}
      <div className="fixed inset-0 flex items-center justify-center p-4 sm:p-6">
        <div
          className={cn(
            'relative w-full max-w-2xl max-h-full',
            'bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900',
            'rounded-2xl shadow-2xl border border-white/20',
            'overflow-hidden transform transition-all duration-300'
          )}
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="relative p-6 pb-4 border-b border-white/10">
            {/* Close Button */}
            <button
              onClick={onClose}
              className={cn(
                'absolute top-4 right-4 z-10',
                'w-8 h-8 rounded-full bg-white/10 hover:bg-white/20',
                'flex items-center justify-center transition-colors',
                'focus:outline-none focus:ring-2 focus:ring-white/30'
              )}
              aria-label="닫기"
            >
              <X className="w-4 h-4 text-white" />
            </button>

            {/* Story Type Badge */}
            <div className="flex items-center gap-3 mb-4">
              <div className={cn(
                'w-10 h-10 rounded-full flex items-center justify-center',
                typeConfig.bgColor
              )}>
                <TypeIcon className="w-5 h-5 text-white" />
              </div>
              <div>
                <span className={cn(
                  'inline-block px-3 py-1 rounded-full text-xs font-medium',
                  'bg-gradient-to-r text-white',
                  typeConfig.color
                )}>
                  {typeConfig.label}
                </span>
              </div>
            </div>

            {/* Author Info */}
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center overflow-hidden">
                {story.memberImage ? (
                  <img
                    src={story.memberImage}
                    alt={story.memberName}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User className="w-6 h-6 text-white" />
                )}
              </div>
              <div className="flex-1">
                <h3 className="text-white font-semibold text-lg">
                  {story.memberName}
                </h3>
                <div className="flex items-center gap-2 text-sm text-gray-300">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDateTime(storyDate)}</span>
                  <span className="text-purple-400">({formatDayOfWeek(storyDate)})</span>
                </div>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 max-h-96 overflow-y-auto scrollbar-thin scrollbar-track-gray-800 scrollbar-thumb-gray-600">
            {/* Story Image */}
            {story.imageUrl && (
              <div className="mb-4 rounded-xl overflow-hidden bg-black/20">
                <img
                  src={story.imageUrl}
                  alt="Story content"
                  className="w-full h-auto max-h-80 object-cover"
                />
              </div>
            )}

            {/* Story Content */}
            <div className="prose prose-invert max-w-none">
              <p className="text-gray-200 leading-relaxed whitespace-pre-wrap">
                {story.content}
              </p>
            </div>
          </div>

          {/* Footer */}
          <div className="p-6 pt-4 border-t border-white/10 bg-black/20">
            <div className="flex items-center justify-between">
              {/* Stats */}
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-2 text-gray-300">
                  <Heart className="w-4 h-4 text-red-400" />
                  <span className="text-sm">{story.likes}</span>
                  <span className="text-xs text-gray-400">좋아요</span>
                </div>
                <div className="flex items-center gap-2 text-gray-300">
                  <MessageCircle className="w-4 h-4 text-blue-400" />
                  <span className="text-sm">{story.comments}</span>
                  <span className="text-xs text-gray-400">댓글</span>
                </div>
              </div>

              {/* Musical Note Info */}
              <div className="flex items-center gap-2 text-gray-400">
                <Music className="w-4 h-4" />
                <span className="text-xs">Musical Story</span>
              </div>
            </div>

            {/* Action Buttons (Optional - for future enhancement) */}
            <div className="mt-4 flex gap-3">
              <button
                className={cn(
                  'flex-1 px-4 py-2 rounded-lg',
                  'bg-gradient-to-r from-red-500/20 to-red-600/20',
                  'border border-red-500/30 text-red-400',
                  'hover:from-red-500/30 hover:to-red-600/30',
                  'transition-colors text-sm font-medium',
                  'focus:outline-none focus:ring-2 focus:ring-red-500/30'
                )}
              >
                <Heart className="w-4 h-4 inline-block mr-2" />
                좋아요
              </button>
              <button
                className={cn(
                  'flex-1 px-4 py-2 rounded-lg',
                  'bg-gradient-to-r from-blue-500/20 to-blue-600/20',
                  'border border-blue-500/30 text-blue-400',
                  'hover:from-blue-500/30 hover:to-blue-600/30',
                  'transition-colors text-sm font-medium',
                  'focus:outline-none focus:ring-2 focus:ring-blue-500/30'
                )}
              >
                <MessageCircle className="w-4 h-4 inline-block mr-2" />
                댓글
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}