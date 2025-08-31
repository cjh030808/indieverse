'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { Story } from '@/types/story';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CoverFlowCarouselProps {
  stories: Story[];
  className?: string;
}

export function CoverFlowCarousel({ stories, className }: CoverFlowCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [likeStates, setLikeStates] = useState<Record<string, boolean>>({});
  const [likeCounts, setLikeCounts] = useState<Record<string, number>>(
    stories.reduce((acc, story) => ({ ...acc, [story.id]: story.likes }), {})
  );
  const [touchStartX, setTouchStartX] = useState<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const handleLike = (storyId: string, currentLikes: number) => {
    const isLiked = likeStates[storyId] || false;
    setLikeStates(prev => ({ ...prev, [storyId]: !isLiked }));
    setLikeCounts(prev => ({
      ...prev,
      [storyId]: isLiked ? currentLikes - 1 : currentLikes + 1
    }));
  };

  const goToNext = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev + 1) % stories.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, stories.length]);

  const goToPrev = useCallback(() => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, stories.length]);

  const goToSlide = useCallback((index: number) => {
    if (isTransitioning || index === currentIndex) return;
    setIsTransitioning(true);
    setCurrentIndex(index);
    setTimeout(() => setIsTransitioning(false), 600);
  }, [isTransitioning, currentIndex]);

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchStartX(e.touches[0].clientX);
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (!touchStartX) return;

    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > 80) {
      if (diff > 0) {
        goToNext();
      } else {
        goToPrev();
      }
    }

    setTouchStartX(null);
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [goToPrev, goToNext]);

  if (!stories.length) return null;

  return (
    <div className={cn('relative w-full', className)}>
      {/* Main Cover Flow Container */}
      <div
        ref={containerRef}
        className="relative h-[600px] overflow-hidden bg-gray-50"
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        style={{
          perspective: '2000px',
          perspectiveOrigin: 'center center'
        }}
      >
        {/* Cover Flow Stage */}
        <div className="absolute inset-0 flex items-center justify-center">
          {stories.map((story, index) => {
            const offset = index - currentIndex;
            const isActive = index === currentIndex;

            // iTunes-like Cover Flow calculations
            const rotateY = isActive ? 0 : (offset > 0 ? -70 : 70); // Sharp angle like iTunes
            const translateX = offset * 200; // Wider spacing for web
            const translateZ = isActive ? 0 : -300; // Push non-active further back
            const scale = isActive ? 1 : 0.75; // More dramatic scale difference
            const opacity = Math.abs(offset) > 3 ? 0 : (isActive ? 1 : 0.6); // Fade distant items

            return (
              <div
                key={story.id}
                className={cn(
                  'absolute cursor-pointer transition-all duration-700 ease-out',
                  'w-[400px] h-[480px]', // Large desktop-friendly cards
                  isTransitioning && 'pointer-events-none'
                )}
                style={{
                  transform: `
                    translateX(${translateX}px) 
                    translateZ(${translateZ}px) 
                    rotateY(${rotateY}deg) 
                    scale(${scale})
                  `,
                  opacity,
                  transformStyle: 'preserve-3d',
                  zIndex: isActive ? 10 : Math.max(0, 5 - Math.abs(offset))
                }}
                onClick={() => !isActive && goToSlide(index)}
              >
                {/* Main Card */}
                <div className="relative w-full h-full">
                  {/* Card Content */}
                  <div className="w-full h-full bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-gray-200 transform-gpu">
                    {/* Image Section - Larger for desktop */}
                    {story.imageUrl && (
                      <div className="h-72 overflow-hidden">
                        <img
                          src={story.imageUrl}
                          alt={story.content}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    )}

                    {/* Content Section */}
                    <div className="p-6 h-[calc(100%-18rem)] flex flex-col justify-between">
                      {/* Author Info */}
                      <div className="flex items-center gap-4 mb-4">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={story.memberImage} alt={story.memberName} />
                          <AvatarFallback className="text-lg">{story.memberName[0]}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-xl text-gray-900">{story.memberName}</h3>
                          <p className="text-gray-500 text-sm">{story.timestamp}</p>
                        </div>
                      </div>

                      {/* Story Content */}
                      <p className="text-gray-700 text-base leading-relaxed mb-4 flex-1">
                        {story.content}
                      </p>

                      {/* Actions */}
                      <div className="flex items-center justify-between">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            handleLike(story.id, likeCounts[story.id] || story.likes);
                          }}
                          className={cn(
                            'flex items-center gap-2 text-gray-600 hover:text-red-500 transition-colors text-lg font-medium',
                            likeStates[story.id] && 'text-red-500'
                          )}
                        >
                          <Heart className={cn('w-6 h-6', likeStates[story.id] && 'fill-current')} />
                          <span>{likeCounts[story.id] || story.likes}</span>
                        </button>

                        <div className="flex items-center gap-2 text-gray-600 text-lg font-medium">
                          <MessageCircle className="w-6 h-6" />
                          <span>{story.comments}</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Reflection Effect */}
                  <div
                    className="absolute top-full left-0 w-full h-48 pointer-events-none"
                    style={{
                      background: `linear-gradient(
                        to bottom,
                        rgba(255, 255, 255, 0.1) 0%,
                        rgba(255, 255, 255, 0.05) 50%,
                        transparent 100%
                      )`,
                      transform: 'rotateX(180deg) scaleY(0.3)',
                      transformOrigin: 'top',
                      filter: 'blur(1px)',
                      opacity: isActive ? 0.8 : 0.4
                    }}
                  >
                    <div className="w-full h-full from-white/10 to-transparent rounded-3xl" />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Navigation Controls */}
      <div className="flex items-center justify-center mt-12 gap-6">
        <button
          onClick={goToPrev}
          disabled={isTransitioning}
          className="p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl hover:bg-white transition-all disabled:opacity-50 border border-gray-200"
        >
          <ChevronLeft className="w-7 h-7 text-gray-700" />
        </button>

        <div className="flex gap-3">
          {stories.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={cn(
                'w-4 h-4 rounded-full transition-all duration-300',
                index === currentIndex
                  ? 'bg-blue-500 scale-125 shadow-lg'
                  : 'bg-white/60 hover:bg-white/80 shadow-md'
              )}
            />
          ))}
        </div>

        <button
          onClick={goToNext}
          disabled={isTransitioning}
          className="p-4 bg-white/90 backdrop-blur-sm rounded-full shadow-xl hover:shadow-2xl hover:bg-white transition-all disabled:opacity-50 border border-gray-200"
        >
          <ChevronRight className="w-7 h-7 text-gray-700" />
        </button>
      </div>
    </div>
  );
}