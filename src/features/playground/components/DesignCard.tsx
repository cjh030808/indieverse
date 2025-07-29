'use client';

import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Heart, MessageCircle, Share2 } from 'lucide-react';
import { FanDesign } from '@/types/playground';
import { cn } from '@/lib/utils';

interface DesignCardProps {
  design: FanDesign;
  className?: string;
  onClick?: (design: FanDesign) => void;
}

export function DesignCard({ design, className, onClick }: DesignCardProps) {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(design.likes);

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setIsLiked(!isLiked);
    setLikeCount(prev => isLiked ? prev - 1 : prev + 1);
  };

  const handleClick = () => {
    onClick?.(design);
  };

  return (
    <Card
      className={cn('overflow-hidden cursor-pointer hover:shadow-lg transition-shadow', className)}
      onClick={handleClick}
    >
      <div className="aspect-[3/4] relative">
        <img
          src={design.imageUrl}
          alt={design.title}
          className="w-full h-full object-cover"
        />
        {design.isTemplate && (
          <div className="absolute top-2 left-2 bg-blue-500 text-white px-2 py-1 rounded text-xs font-medium">
            Template
          </div>
        )}
      </div>

      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 truncate">
          {design.title}
        </h3>
        <p className="text-sm text-gray-600 mb-2 truncate">
          by {design.author}
        </p>

        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <button
              onClick={handleLike}
              className={cn(
                'flex items-center gap-1 text-gray-500 hover:text-red-500 transition-colors',
                isLiked && 'text-red-500'
              )}
            >
              <Heart className={cn('w-4 h-4', isLiked && 'fill-current')} />
              <span className="text-xs">{likeCount}</span>
            </button>
            <div className="flex items-center gap-1 text-gray-500">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs">{design.comments}</span>
            </div>
          </div>

          <button className="text-gray-500 hover:text-gray-700 transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </Card>
  );
} 