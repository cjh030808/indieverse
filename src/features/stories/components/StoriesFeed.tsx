'use client';

import { useStories } from '../hooks/useStories';
import { StoryCard } from './StoryCard';
import { cn } from '@/lib/utils';

interface StoriesFeedProps {
  className?: string;
}

export function StoriesFeed({ className }: StoriesFeedProps) {
  const { data: stories, isLoading, error } = useStories();

  if (isLoading) {
    return (
      <div className={cn('space-y-6', className)}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="bg-gray-200 rounded-lg h-64"></div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-gray-500">스토리를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  if (!stories || stories.length === 0) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-gray-500">아직 스토리가 없습니다.</p>
      </div>
    );
  }

  return (
    <div className={cn('space-y-6', className)}>
      {stories.map((story) => (
        <StoryCard key={story.id} story={story} />
      ))}
    </div>
  );
} 