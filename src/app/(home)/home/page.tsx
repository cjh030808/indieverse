'use client';

import { StoryHeader } from '@/features/stories/components/StoryHeader';
import { StoriesFeed } from '@/features/stories/components/StoriesFeed';
import { useBandMembers } from '@/features/stories/hooks/useStories';
import { cn } from '@/lib/utils';

export default function HomePage() {
  const { data: members, isLoading: membersLoading } = useBandMembers();

  return (
    <>
      {/* Story Header */}
      <div className="mb-8">
        {membersLoading ? (
          <div className="flex gap-4 overflow-x-auto pb-4">
            {Array.from({ length: 5 }).map((_, index) => (
              <div key={index} className="flex flex-col items-center gap-2 min-w-[64px] animate-pulse">
                <div className="w-16 h-16 bg-gray-200 rounded-full"></div>
                <div className="w-12 h-4 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : (
          <StoryHeader members={members || []} />
        )}
      </div>

      {/* Stories Feed */}
      <StoriesFeed />
    </>
  );
} 