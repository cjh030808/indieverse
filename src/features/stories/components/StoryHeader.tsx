'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { BandMember } from '@/types/story';
import { cn } from '@/lib/utils';

interface StoryHeaderProps {
  members: BandMember[];
  className?: string;
}

export function StoryHeader({ members, className }: StoryHeaderProps) {
  return (
    <div className={cn('flex gap-4 overflow-x-auto pb-4', className)}>
      {members.map((member) => (
        <div key={member.id} className="flex flex-col items-center gap-2 min-w-[64px]">
          <Avatar className="w-16 h-16 cursor-pointer hover:opacity-80 transition-opacity">
            <AvatarImage src={member.image} alt={member.name} />
            <AvatarFallback className="text-lg font-semibold">
              {member.name[0]}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm text-center text-gray-700 font-medium">
            {member.name}
          </span>
        </div>
      ))}
    </div>
  );
} 