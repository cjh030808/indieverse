'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Heart, MessageCircle } from 'lucide-react';
import { Story } from '@/types/story';
import { cn } from '@/lib/utils';

interface StoryCardProps {
  story: Story;
  className?: string;
}

export function StoryCard({ story, className }: StoryCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(story.likes);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  return (
    <Card className={cn('overflow-hidden', className)}>
      <div className="flex">
        {story.imageUrl && (
          <div className="w-1/2 h-64">
            <img
              src={story.imageUrl}
              alt={story.content}
              className="w-full h-full object-cover"
            />
          </div>
        )}
        <div className={cn('flex-1 p-4', story.imageUrl ? 'w-1/2' : 'w-full')}>
          <div className="flex items-center gap-3 mb-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src={story.memberImage} alt={story.memberName} />
              <AvatarFallback>{story.memberName[0]}</AvatarFallback>
            </Avatar>
            <span className="font-semibold text-lg">{story.memberName}</span>
          </div>
          <p className="text-gray-600 mb-3 leading-relaxed">{story.content}</p>
          <p className="text-gray-500 text-sm mb-4">{story.timestamp}</p>
          <div className="flex items-center gap-6">
            <button
              onClick={handleLike}
              className={cn(
                'flex items-center gap-2 text-gray-500 hover:text-red-500 transition-colors',
                isLiked && 'text-red-500'
              )}
            >
              <Heart className={cn('w-5 h-5', isLiked && 'fill-current')} />
              <span className="font-semibold">{likeCount}</span>
            </button>
            <div className="flex items-center gap-2 text-gray-500">
              <MessageCircle className="w-5 h-5" />
              <span className="font-semibold">{story.comments}</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
} 