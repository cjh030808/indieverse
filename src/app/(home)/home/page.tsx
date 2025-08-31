'use client';

import { StoriesFeed } from '@/features/stories/components/StoriesFeed';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Member Stories Carousel */}
      <div className="w-full">
        <StoriesFeed />
      </div>
    </div>
  );
} 