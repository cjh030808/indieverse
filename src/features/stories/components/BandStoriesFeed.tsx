"use client";

import { useStories } from "../hooks/useStories";
import { MusicalNoteButton } from "./MusicalNoteButton";
import { StoryModal } from "./StoryModal";
import { cn } from "@/lib/utils";
import { Story } from "@/types/story";
import { useMemo, useState } from "react";
import { 
  groupStoriesByWeek, 
  getWeekDateRange, 
  getDayOfWeekPosition, 
  getNoteType, 
  isCurrentWeek 
} from "../utils/weekGrouping";

interface BandStoriesFeedProps {
  className?: string;
}

// Musical staff configuration
const STAFF_LINES = 5;
const STAFF_LINE_HEIGHT = 24;
const TREBLE_CLEF_WIDTH = 60;
const DAY_LABELS = ["월", "화", "수", "목", "금", "토", "일"];

export function BandStoriesFeed({ className }: BandStoriesFeedProps) {
  const { data: stories, isLoading, error } = useStories();
  const [selectedStory, setSelectedStory] = useState<Story | null>(null);

  // Group stories by week
  const weekGroups = useMemo(() => {
    if (!stories) return [];
    return groupStoriesByWeek(stories);
  }, [stories]);

  if (isLoading) {
    return (
      <div className={cn("space-y-6", className)}>
        {Array.from({ length: 3 }).map((_, index) => (
          <div key={index} className="animate-pulse">
            <div className="relative bg-white rounded-xl p-8 border border-black/10">
              <div className="h-48 bg-gray-200/30 rounded-lg"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className={cn("text-center py-8", className)}>
        <p className="text-purple-300">
          밴드 이야기를 불러오는 중 오류가 발생했습니다.
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
            아직 밴드 이야기가 없습니다. 첫 번째 음표를 만들어보세요!
          </p>
        </div>
      </div>
    );
  }

  const staffHeight = (STAFF_LINES - 1) * STAFF_LINE_HEIGHT + 60;

  return (
    <div className={cn("w-full space-y-6", className)}>
      {/* Weekly Music Staff Sections */}
      {weekGroups.map((weekGroup, weekIndex) => {
        const isCurrentWeekGroup = isCurrentWeek(weekGroup.weekStart);
        const { start, end } = getWeekDateRange(weekGroup.weekStart);
        
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
            {/* Week Date Range - Top Right */}
            <div className="absolute top-4 right-4">
              <div className={cn(
                "text-xs px-3 py-1 rounded-full font-medium",
                isCurrentWeekGroup 
                  ? "bg-purple-100 text-purple-700 border border-purple-200" 
                  : "bg-black/5 text-black/50 border border-black/10"
              )}>
                {start} - {end}
              </div>
              {isCurrentWeekGroup && (
                <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 animate-pulse" />
              )}
            </div>

            {/* Scrollable Staff Container */}
            <div className="overflow-x-auto scrollbar-thin scrollbar-track-transparent scrollbar-thumb-purple-200/30">
              <div
                className="relative min-w-full"
                style={{ height: `${staffHeight}px`, minWidth: "800px" }}
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
                  {Array.from({ length: STAFF_LINES }).map((_, index) => (
                    <div
                      key={index}
                      className={cn(
                        "absolute w-full h-px",
                        isCurrentWeekGroup ? "bg-purple-300/40" : "bg-black/30"
                      )}
                      style={{
                        top: `${30 + index * STAFF_LINE_HEIGHT}px`,
                      }}
                    />
                  ))}

                  {/* Day Labels */}
                  <div className="absolute top-2 left-0 right-0 flex justify-between px-4">
                    {DAY_LABELS.map((label, index) => (
                      <div
                        key={label}
                        className={cn(
                          "text-xs font-medium",
                          isCurrentWeekGroup ? "text-purple-600" : "text-black/50"
                        )}
                      >
                        {label}
                      </div>
                    ))}
                  </div>

                  {/* Musical Notes */}
                  {weekGroup.stories.map((story) => {
                    const position = getDayOfWeekPosition(story.timestamp);
                    const noteType = getNoteType(story);
                    
                    return (
                      <MusicalNoteButton
                        key={story.id}
                        story={story}
                        noteType={noteType}
                        onStoryClick={setSelectedStory}
                        style={{
                          position: "absolute",
                          left: `${position.x}%`,
                          top: `${position.y + 30}px`,
                          transform: "translate(-50%, -50%)",
                          zIndex: 20,
                        }}
                      />
                    );
                  })}
                </div>

                {/* Gradient fade effect on the right */}
                <div className="absolute right-0 top-0 w-8 sm:w-16 h-full bg-gradient-to-l from-white/80 to-transparent pointer-events-none" />
              </div>
            </div>

            {/* Week Info Footer */}
            <div className="mt-4 sm:mt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-sm">
              <div className="flex items-center gap-2 sm:gap-4">
                <span className={cn(
                  "text-xs sm:text-sm",
                  isCurrentWeekGroup ? "text-purple-600" : "text-black/60"
                )}>
                  월요일
                </span>
                <div className={cn(
                  "w-6 sm:w-8 h-px",
                  isCurrentWeekGroup ? "bg-purple-400" : "bg-black/40"
                )} />
                <span className={cn(
                  "text-xs sm:text-sm",
                  isCurrentWeekGroup ? "text-purple-600" : "text-black/60"
                )}>
                  일요일
                </span>
              </div>
              <div className={cn(
                "text-xs opacity-75",
                isCurrentWeekGroup ? "text-purple-700" : "text-black/70"
              )}>
                {weekGroup.stories.length}개의 음표가 연주 중입니다
              </div>
            </div>

            {/* Mobile scroll hint */}
            {weekIndex === 0 && (
              <div className="sm:hidden flex items-center justify-center mt-2 text-xs text-black/40">
                ← 좌우로 스크롤하여 더 많은 음표를 확인하세요 →
              </div>
            )}
          </div>
        );
      })}

      {/* Overall Stats */}
      <div className="text-center text-sm text-black/50 border-t border-black/10 pt-4">
        총 {stories.length}개의 음표가 {weekGroups.length}주 동안 연주되었습니다
      </div>

      {/* Story Modal */}
      <StoryModal
        story={selectedStory}
        isOpen={!!selectedStory}
        onClose={() => setSelectedStory(null)}
      />
    </div>
  );
}
