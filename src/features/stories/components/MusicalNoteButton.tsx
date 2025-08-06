'use client';

import { Story } from '@/types/story';
import { cn } from '@/lib/utils';
import { useState } from 'react';
import { Music, Heart, MessageCircle, Calendar, User } from 'lucide-react';

interface MusicalNoteButtonProps {
  story: Story;
  noteType: 'quarter' | 'eighth' | 'half' | 'whole';
  style?: React.CSSProperties;
  className?: string;
}

// Musical note symbols for different types
const NOTE_SYMBOLS = {
  quarter: '♩',
  eighth: '♪',
  half: '𝅗𝅥',
  whole: '𝅝'
};

// Color schemes based on note type
const NOTE_COLORS = {
  quarter: 'from-purple-500 to-purple-600',
  eighth: 'from-pink-500 to-pink-600', 
  half: 'from-blue-500 to-blue-600',
  whole: 'from-green-500 to-green-600'
};

const NOTE_HOVER_COLORS = {
  quarter: 'from-purple-400 to-purple-500',
  eighth: 'from-pink-400 to-pink-500',
  half: 'from-blue-400 to-blue-500', 
  whole: 'from-green-400 to-green-500'
};

export function MusicalNoteButton({ 
  story, 
  noteType, 
  style, 
  className 
}: MusicalNoteButtonProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const handleClick = () => {
    // TODO: Open modal with story content
    console.log('Opening story:', story.id);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleDateString('ko-KR', {
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div
      style={style}
      className={cn('relative group', className)}
      onMouseEnter={() => {
        setIsHovered(true);
        setShowTooltip(true);
      }}
      onMouseLeave={() => {
        setIsHovered(false);
        setShowTooltip(false);
      }}
    >
      {/* Musical Note Button */}
      <button
        onClick={handleClick}
        className={cn(
          'relative w-6 h-6 sm:w-8 sm:h-8 rounded-full transition-all duration-300 transform',
          'flex items-center justify-center text-white font-bold text-sm sm:text-lg',
          'shadow-lg hover:shadow-xl hover:scale-110 active:scale-95',
          'bg-gradient-to-br border border-white/20',
          'focus:outline-none focus:ring-2 focus:ring-white/30',
          isHovered ? NOTE_HOVER_COLORS[noteType] : NOTE_COLORS[noteType]
        )}
      >
        {/* Note Symbol */}
        <span className="text-white text-sm sm:text-xl leading-none">
          {NOTE_SYMBOLS[noteType]}
        </span>
        
        {/* Pulse animation for recent posts */}
        {new Date().getTime() - new Date(story.timestamp).getTime() < 24 * 60 * 60 * 1000 && (
          <div className={cn(
            'absolute inset-0 rounded-full animate-ping',
            'bg-gradient-to-br opacity-30',
            NOTE_COLORS[noteType]
          )} />
        )}
        
        {/* Glow effect on hover */}
        {isHovered && (
          <div className={cn(
            'absolute inset-0 rounded-full blur-sm opacity-60',
            'bg-gradient-to-br',
            NOTE_HOVER_COLORS[noteType]
          )} />
        )}
      </button>

      {/* Tooltip/Hover Card */}
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 z-50 hidden sm:block">
          <div className="bg-gray-900/95 backdrop-blur-sm border border-white/20 rounded-lg p-3 w-64 shadow-xl">
            {/* Arrow pointing down */}
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-2 h-2 bg-gray-900/95 border-r border-b border-white/20 rotate-45" />
            
            {/* Content */}
            <div className="space-y-2">
              {/* Author and Date */}
              <div className="flex items-center justify-between text-xs text-gray-400">
                <div className="flex items-center gap-1">
                  <User className="w-3 h-3" />
                  <span>{story.memberName}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="w-3 h-3" />
                  <span>{formatDate(story.timestamp)}</span>
                </div>
              </div>
              
              {/* Story Content Preview */}
              <div className="text-white text-sm leading-relaxed">
                {story.content.length > 120 
                  ? `${story.content.substring(0, 120)}...` 
                  : story.content
                }
              </div>
              
              {/* Story Image Preview */}
              {story.imageUrl && (
                <div className="w-full h-20 bg-gray-800 rounded overflow-hidden">
                  <img 
                    src={story.imageUrl} 
                    alt="Story preview" 
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
              
              {/* Stats */}
              <div className="flex items-center gap-4 text-xs text-gray-400 pt-1 border-t border-white/10">
                <div className="flex items-center gap-1">
                  <Heart className="w-3 h-3" />
                  <span>{story.likes}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-3 h-3" />
                  <span>{story.comments}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Music className="w-3 h-3" />
                  <span className="capitalize">{noteType} note</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}