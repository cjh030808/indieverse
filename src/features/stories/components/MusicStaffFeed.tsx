'use client';

import { useStories } from '../hooks/useStories';
import { MusicalNoteButton } from './MusicalNoteButton';
import { cn } from '@/lib/utils';
import { Story } from '@/types/story';
import { useMemo } from 'react';

interface MusicStaffFeedProps {
  className?: string;
}

// Musical staff configuration
const STAFF_LINES = 5;
const STAFF_LINE_HEIGHT = 24; // Height between staff lines in pixels
const TREBLE_CLEF_WIDTH = 60;

// Calculate note positions based on date and story index
const calculateNotePosition = (story: Story, index: number, totalStories: number) => {
  const storyDate = new Date(story.timestamp);
  const now = new Date();
  const daysDiff = Math.floor((now.getTime() - storyDate.getTime()) / (1000 * 60 * 60 * 24));
  
  // Position notes from left to right based on recency (newer = further right)
  const baseX = Math.max(0, 100 - (daysDiff * 5)); // Percentage from left
  const xPosition = Math.min(95, baseX + (index * 8)); // Add some spacing between notes
  
  // Distribute notes across staff lines and spaces (9 positions total: 5 lines + 4 spaces)
  const staffPosition = index % 9;
  const yPosition = staffPosition * (STAFF_LINE_HEIGHT / 2) + STAFF_LINE_HEIGHT;
  
  return { x: xPosition, y: yPosition };
};

// Get note type based on story content and type
const getNoteType = (story: Story): 'quarter' | 'eighth' | 'half' | 'whole' => {
  // Prioritize story type if available
  if (story.type) {
    switch (story.type) {
      case 'announcement': return 'whole';
      case 'video': return 'half';
      case 'photo': return 'eighth';
      case 'story': return 'quarter';
    }
  }
  
  // Fallback to content length based logic
  const contentLength = story.content.length;
  if (contentLength < 50) return 'quarter';
  if (contentLength < 100) return 'eighth';
  if (contentLength < 200) return 'half';
  return 'whole';
};

export function MusicStaffFeed({ className }: MusicStaffFeedProps) {
  const { data: stories, isLoading, error } = useStories();

  // Calculate positions for all stories
  const storyPositions = useMemo(() => {
    if (!stories) return [];
    return stories.map((story, index) => ({
      story,
      position: calculateNotePosition(story, index, stories.length),
      noteType: getNoteType(story)
    }));
  }, [stories]);

  if (isLoading) {
    return (
      <div className={cn('space-y-6', className)}>
        <div className="animate-pulse">
          <div className="relative bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-8 border border-white/10">
            <div className="h-48 bg-gray-700/30 rounded-lg"></div>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn('text-center py-8', className)}>
        <p className="text-purple-300">음악 피드를 불러오는 중 오류가 발생했습니다.</p>
      </div>
    );
  }

  if (!stories || stories.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <div className="relative bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-8 border border-white/10">
          {/* Empty Staff */}
          <div className="relative h-32">
            {/* Treble Clef */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-4xl text-purple-400 font-serif">
              𝄞
            </div>
            
            {/* Staff Lines */}
            <div className="ml-16">
              {Array.from({ length: STAFF_LINES }).map((_, index) => (
                <div
                  key={index}
                  className="absolute w-full h-px bg-gradient-to-r from-purple-500/60 to-pink-500/60"
                  style={{
                    top: `${20 + (index * STAFF_LINE_HEIGHT)}px`
                  }}
                />
              ))}
            </div>
          </div>
          <p className="text-purple-300 mt-4">아직 연주할 음악이 없습니다. 첫 번째 노트를 만들어보세요!</p>
        </div>
      </div>
    );
  }

  const staffHeight = (STAFF_LINES - 1) * STAFF_LINE_HEIGHT + 60; // Extra padding

  return (
    <div className={cn('w-full', className)}>
      <div className="relative bg-gradient-to-r from-purple-900/20 to-pink-900/20 rounded-xl p-4 sm:p-6 md:p-8 border border-white/10 overflow-hidden">
        {/* Scrollable Staff Container */}
        <div className="overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-500/30">
          <div className="relative min-w-full" style={{ height: `${staffHeight}px`, minWidth: '800px' }}>
            {/* Treble Clef */}
            <div 
              className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 text-purple-400 font-serif z-10 text-3xl sm:text-4xl md:text-5xl"
            >
              𝄞
            </div>
            
            {/* Staff Lines */}
            <div className="ml-12 sm:ml-16 relative h-full">
              {Array.from({ length: STAFF_LINES }).map((_, index) => (
                <div
                  key={index}
                  className="absolute w-full h-px bg-gradient-to-r from-purple-500/60 to-pink-500/60"
                  style={{
                    top: `${30 + (index * STAFF_LINE_HEIGHT)}px`
                  }}
                />
              ))}
              
              {/* Musical Notes */}
              {storyPositions.map(({ story, position, noteType }, index) => (
                <MusicalNoteButton
                  key={story.id}
                  story={story}
                  noteType={noteType}
                  style={{
                    position: 'absolute',
                    left: `${position.x}%`,
                    top: `${position.y}px`,
                    transform: 'translate(-50%, -50%)',
                    zIndex: 20 + index
                  }}
                />
              ))}
            </div>
            
            {/* Gradient fade effect on the right */}
            <div className="absolute right-0 top-0 w-8 sm:w-16 h-full bg-gradient-to-l from-purple-900/40 to-transparent pointer-events-none" />
          </div>
        </div>
        
        {/* Legend */}
        <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm text-purple-300">
          <div className="flex items-center gap-2 sm:gap-4">
            <span className="text-xs sm:text-sm">최신</span>
            <div className="w-6 sm:w-8 h-px bg-gradient-to-r from-purple-500 to-pink-500" />
            <span className="text-xs sm:text-sm">과거</span>
          </div>
          <div className="text-xs opacity-75">
            {stories.length}개의 음표가 연주 중입니다
          </div>
        </div>
        
        {/* Mobile scroll hint */}
        <div className="sm:hidden flex items-center justify-center mt-2 text-xs text-purple-400/60">
          ← 좌우로 스크롤하여 더 많은 음표를 확인하세요 →
        </div>
      </div>
    </div>
  );
}