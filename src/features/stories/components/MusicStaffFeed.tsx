"use client";

import { useStories } from "../hooks/useStories";
import { MusicalNoteButton } from "./MusicalNoteButton";
import { StoryModal } from "./StoryModal";
import { cn } from "@/lib/utils";
import { Story } from "@/types/story";
import { useMemo, useState } from "react";
import { 
  groupStoriesByWeek, 
  positionStoriesInWeek, 
  calculateNotePosition,
  getDayName,
  isCurrentWeek,
  WeekGroup,
  PositionedStory 
} from "../utils/weekGrouping";

interface MusicStaffFeedProps {
  className?: string;
}

// Musical staff configuration
const STAFF_LINES = 5;
const STAFF_LINE_HEIGHT = 24; // Height between staff lines in pixels
const STAFF_HEIGHT = 180; // Fixed height for each staff
const TREBLE_CLEF_WIDTH = 60;

export function MusicStaffFeed({ className }: MusicStaffFeedProps) {
  const { data: stories, isLoading, error } = useStories();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group stories by week
  const weekGroups = useMemo(() => {
    if (!stories) return [];
    return groupStoriesByWeek(stories);
  }, [stories]);

  // Handle story modal
  const handleStoryClick = (story: Story) => {
    setSelectedStory(story);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedStory(null);
  };

  if (isLoading) {
    return (
      <div className={cn("space-y-6", className)}>
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
      <div className={cn("text-center py-8", className)}>
        <p className="text-purple-300">
          음악 피드를 불러오는 중 오류가 발생했습니다.
        </p>
      </div>
    );
  }

  if (!stories || stories.length === 0) {
    return (
      <div className={cn("text-center py-12", className)}>
        <div className="relative bg-white rounded-xl p-8 border border-black/10">
          {/* Empty Staff */}
          <div className="relative h-32">
            {/* Treble Clef */}
            <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-4xl text-black font-serif">
              𝄞
            </div>

            {/* Staff Lines */}
            <div className="ml-16">
              {Array.from({ length: STAFF_LINES }).map((_, index) => (
                <div
                  key={index}
                  className="absolute w-full h-px bg-black/30"
                  style={{
                    top: `${20 + index * STAFF_LINE_HEIGHT}px`,
                  }}
                />
              ))}
            </div>
          </div>
          <p className="text-black/70 mt-4">
            아직 연주할 음악이 없습니다. 첫 번째 노트를 만들어보세요!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Weekly Staff Sections */}
      <div className="max-h-screen overflow-y-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-300/20 space-y-6">
        {weekGroups.map((weekGroup, weekIndex) => {
          const positionedStories = positionStoriesInWeek(weekGroup.stories);
          const isCurrentWeekGroup = isCurrentWeek(weekGroup.weekStart);

          return (
            <div
              key={`${weekGroup.weekStart.getTime()}`}
              className={cn(
                "relative rounded-xl p-4 sm:p-6 md:p-8 border overflow-hidden",
                "transition-all duration-300 hover:shadow-lg",
                isCurrentWeekGroup 
                  ? "bg-gradient-to-r from-purple-50 to-pink-50 border-purple-200/50 shadow-md" 
                  : "bg-white border-black/10"
              )}
            >
              {/* Week Header */}
              <div className="mb-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {isCurrentWeekGroup && (
                    <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
                  )}
                  <h3 className={cn(
                    "text-sm font-medium",
                    isCurrentWeekGroup ? "text-purple-800" : "text-black/70"
                  )}>
                    이번 주
                  </h3>
                </div>
                <div className={cn(
                  "text-xs px-2 py-1 rounded-full",
                  isCurrentWeekGroup 
                    ? "bg-purple-100 text-purple-700" 
                    : "bg-black/5 text-black/50"
                )}>
                  {weekGroup.weekLabel}
                </div>
              </div>

              {/* Staff Container */}
              <div className="overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-black/20">
                <div
                  className="relative min-w-full"
                  style={{ height: `${STAFF_HEIGHT}px`, minWidth: "800px" }}
                >
                  {/* Treble Clef */}
                  <div className={cn(
                    "absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 font-serif z-10 text-3xl sm:text-4xl md:text-5xl",
                    isCurrentWeekGroup ? "text-purple-600" : "text-black"
                  )}>
                    𝄞
                  </div>

                  {/* Staff Lines */}
                  <div className="ml-12 sm:ml-16 relative h-full">
                    {Array.from({ length: STAFF_LINES }).map((_, lineIndex) => (
                      <div
                        key={lineIndex}
                        className={cn(
                          "absolute w-full h-px",
                          isCurrentWeekGroup ? "bg-purple-300/40" : "bg-black/30"
                        )}
                        style={{
                          top: `${60 + lineIndex * STAFF_LINE_HEIGHT}px`,
                        }}
                      />
                    ))}

                    {/* Day Labels */}
                    <div className="absolute top-2 left-0 right-0 flex justify-between text-xs text-black/40 px-2">
                      {['월', '화', '수', '목', '금', '토', '일'].map((day, dayIndex) => (
                        <div key={dayIndex} className="text-center min-w-0">
                          {day}
                        </div>
                      ))}
                    </div>

                    {/* Musical Notes */}
                    {positionedStories.map((positionedStory, storyIndex) => {
                      const position = calculateNotePosition(positionedStory.dayPosition, storyIndex);
                      return (
                        <MusicalNoteButton
                          key={positionedStory.story.id}
                          story={positionedStory.story}
                          noteType={positionedStory.noteType}
                          onStoryClick={handleStoryClick}
                          dayName={getDayName(positionedStory.dayPosition)}
                          style={{
                            position: "absolute",
                            left: `${position.x}%`,
                            top: `${position.y}px`,
                            transform: "translate(-50%, -50%)",
                            zIndex: 20 + storyIndex,
                          }}
                        />
                      );
                    })}
                  </div>

                  {/* Gradient fade effect on the right */}
                  <div className="absolute right-0 top-0 w-8 sm:w-16 h-full bg-gradient-to-l from-white to-transparent pointer-events-none" />
                </div>
              </div>

              {/* Week Stats */}
              <div className="mt-4 flex items-center justify-between text-xs">
                <div className={cn(
                  "opacity-75",
                  isCurrentWeekGroup ? "text-purple-700" : "text-black/70"
                )}>
                  {weekGroup.stories.length}개의 음표
                </div>
                {weekIndex === 0 && (
                  <div className="sm:hidden text-black/40">
                    ← 좌우로 스크롤하여 더 많은 음표를 확인하세요 →
                  </div>
                )}
              </div>
            </div>
          );
        })}
      </div>

      {/* Overall Stats */}
      <div className="text-center text-sm text-black/50 border-t border-black/10 pt-4">
        총 {stories.length}개의 음표가 {weekGroups.length}주 동안 연주되고 있습니다
      </div>

      {/* Story Modal */}
      <StoryModal
        story={selectedStory}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
      />
    </div>
  );
}
