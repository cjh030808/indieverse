'use client';

import { useStories } from '../hooks/useStories';
import { CoverFlowCarousel } from './CoverFlowCarousel';
import { cn } from '@/lib/utils';

interface StoriesFeedProps {
  className?: string;
}

export function StoriesFeed({ className }: StoriesFeedProps) {
  const { data: stories, isLoading, error } = useStories();

  if (isLoading) {
    return (
      <div className={cn('flex items-center justify-center py-16 bg-gray-50', className)}>
        <div className="flex gap-8">
          {Array.from({ length: 3 }).map((_, index) => (
            <div key={index} className="animate-pulse">
              <div className="bg-gray-200 rounded-2xl w-96 h-80 shadow-lg"></div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('text-center py-16 bg-white', className)}>
        <p className="text-gray-600 text-lg">스토리를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  if (!stories || stories.length === 0) {
    return (
      <div className={cn('text-center py-16 bg-white', className)}>
        <p className="text-gray-600 text-lg">아직 스토리가 없습니다.</p>
      </div>
    );
  }

  return (
    <CoverFlowCarousel stories={stories} className={className} />
  );
} 