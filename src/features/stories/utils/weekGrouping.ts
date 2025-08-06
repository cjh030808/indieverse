import { Story } from '@/types/story';
import { startOfWeek, endOfWeek, format, isSameWeek, getDay } from 'date-fns';
import { ko } from 'date-fns/locale';

export interface WeekGroup {
  weekStart: Date;
  weekEnd: Date;
  weekLabel: string;
  stories: Story[];
}

export interface PositionedStory {
  story: Story;
  dayOfWeek: number; // 0 = Sunday, 1 = Monday, etc.
  dayPosition: number; // Position within the day (0-6 for Monday-Sunday)
  noteType: 'quarter' | 'eighth' | 'half' | 'whole';
}

// Safely parse date with fallback
export const safeParseDate = (timestamp: string): Date => {
  try {
    const date = new Date(timestamp);
    if (isNaN(date.getTime())) {
      console.warn(`Invalid timestamp: ${timestamp}, using current date as fallback`);
      return new Date();
    }
    return date;
  } catch (error) {
    console.warn(`Error parsing timestamp: ${timestamp}, using current date as fallback`);
    return new Date();
  }
};

// Get note type based on story content and type
export const getNoteType = (story: Story): "quarter" | "eighth" | "half" | "whole" => {
  // Prioritize story type if available
  if (story.type) {
    switch (story.type) {
      case "announcement":
        return "whole";
      case "video":
        return "half";
      case "photo":
        return "eighth";
      case "story":
        return "quarter";
    }
  }

  // Fallback to content length based logic
  const contentLength = story.content.length;
  if (contentLength < 50) return "quarter";
  if (contentLength < 100) return "eighth";
  if (contentLength < 200) return "half";
  return "whole";
};

// Convert day of week to position (Monday = 0, Sunday = 6)
export const getDayPosition = (date: Date): number => {
  const dayOfWeek = getDay(date); // 0 = Sunday, 1 = Monday, etc.
  return dayOfWeek === 0 ? 6 : dayOfWeek - 1; // Convert to Monday=0, Sunday=6
};

// Group stories by week
export const groupStoriesByWeek = (stories: Story[]): WeekGroup[] => {
  if (!stories || stories.length === 0) return [];

  // Parse and sort stories by date (newest first)
  const parsedStories = stories
    .map(story => ({
      story,
      date: safeParseDate(story.timestamp)
    }))
    .sort((a, b) => b.date.getTime() - a.date.getTime());

  // Group stories by week
  const weekGroups = new Map<string, WeekGroup>();

  parsedStories.forEach(({ story, date }) => {
    // Get Monday as the start of the week
    const weekStart = startOfWeek(date, { weekStartsOn: 1 });
    const weekEnd = endOfWeek(date, { weekStartsOn: 1 });
    const weekKey = format(weekStart, 'yyyy-MM-dd');

    if (!weekGroups.has(weekKey)) {
      weekGroups.set(weekKey, {
        weekStart,
        weekEnd,
        weekLabel: formatWeekLabel(weekStart, weekEnd),
        stories: []
      });
    }

    weekGroups.get(weekKey)!.stories.push(story);
  });

  // Convert to array and sort by week start date (newest first)
  return Array.from(weekGroups.values())
    .sort((a, b) => b.weekStart.getTime() - a.weekStart.getTime());
};

// Format week label for display
export const formatWeekLabel = (weekStart: Date, weekEnd: Date): string => {
  const startMonth = format(weekStart, 'MM', { locale: ko });
  const startDay = format(weekStart, 'dd', { locale: ko });
  const endMonth = format(weekEnd, 'MM', { locale: ko });
  const endDay = format(weekEnd, 'dd', { locale: ko });

  // If same month, show "MM/DD - DD", otherwise "MM/DD - MM/DD"
  if (startMonth === endMonth) {
    return `${startMonth}/${startDay} - ${endDay}`;
  } else {
    return `${startMonth}/${startDay} - ${endMonth}/${endDay}`;
  }
};

// Position stories within a week's staff
export const positionStoriesInWeek = (stories: Story[]): PositionedStory[] => {
  return stories.map(story => {
    const date = safeParseDate(story.timestamp);
    const dayOfWeek = getDay(date);
    const dayPosition = getDayPosition(date);
    const noteType = getNoteType(story);

    return {
      story,
      dayOfWeek,
      dayPosition,
      noteType
    };
  });
};

// Calculate note position on staff based on day of week
export const calculateNotePosition = (dayPosition: number, storyIndex: number = 0): { x: number; y: number } => {
  // Position notes based on day of week (Monday=leftmost, Sunday=rightmost)
  // Each day gets about 12.5% of the staff width (7 days + margins)
  const dayWidth = 12.5; // Percentage width per day
  const baseX = 10 + (dayPosition * dayWidth); // Start from 10% margin

  // Add slight offset for multiple stories on same day
  const xOffset = (storyIndex * 2) % 6; // Small horizontal offset for overlapping stories
  const xPosition = Math.min(90, baseX + xOffset); // Ensure we don't exceed 90%

  // Distribute notes across staff lines and spaces
  // Use day position and story index to create variety
  const staffPosition = (dayPosition + storyIndex) % 9; // 5 lines + 4 spaces
  const yPosition = staffPosition * 12 + 24; // Staff line height

  return { x: xPosition, y: yPosition };
};

// Get day name in Korean
export const getDayName = (dayPosition: number): string => {
  const days = ['월', '화', '수', '목', '금', '토', '일'];
  return days[dayPosition] || '';
};

// Check if a date is within the current week
export const isCurrentWeek = (date: Date): boolean => {
  const now = new Date();
  return isSameWeek(date, now, { weekStartsOn: 1 });
};

// Check if a story is recent (within 24 hours)
export const isRecentStory = (story: Story): boolean => {
  const storyDate = safeParseDate(story.timestamp);
  const now = new Date();
  const hoursDiff = (now.getTime() - storyDate.getTime()) / (1000 * 60 * 60);
  return hoursDiff <= 24;
};

// Get week date range for display (MM/DD format)
export const getWeekDateRange = (weekStart: Date): { start: string; end: string } => {
  const weekEnd = endOfWeek(weekStart, { weekStartsOn: 1 });
  const start = format(weekStart, 'MM/dd');
  const end = format(weekEnd, 'MM/dd');
  return { start, end };
};

// Get position for a story based on day of week
export const getDayOfWeekPosition = (timestamp: string): { x: number; y: number } => {
  const date = safeParseDate(timestamp);
  const dayPosition = getDayPosition(date);
  
  // Position based on day of week (Monday=leftmost, Sunday=rightmost)
  const dayWidth = 12.5; // Percentage width per day
  const baseX = 10 + (dayPosition * dayWidth); // Start from 10% margin
  
  // Random Y position within staff area
  const staffLines = 5;
  const staffLineHeight = 24;
  const staffPosition = dayPosition % (staffLines * 2 - 1); // 9 positions (5 lines + 4 spaces)
  const yPosition = staffPosition * (staffLineHeight / 2);
  
  return { x: baseX, y: yPosition };
};