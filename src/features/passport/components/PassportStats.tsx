'use client';

import { Card } from '@/components/ui/card';
import type { PassportStats as PassportStatsType } from '@/types/passport';
import { cn } from '@/lib/utils';

interface PassportStatsProps {
  stats: PassportStatsType;
  className?: string;
}

export function PassportStats({ stats, className }: PassportStatsProps) {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-3 gap-4', className)}>
      <Card className="p-6 border border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {stats.totalConcerts}
          </div>
          <div className="text-sm text-gray-600">Concerts</div>
        </div>
      </Card>

      <Card className="p-6 border border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {stats.favoriteBand}
          </div>
          <div className="text-sm text-gray-600">Favorite Band</div>
        </div>
      </Card>

      <Card className="p-6 border border-gray-200">
        <div className="text-center">
          <div className="text-2xl font-bold text-gray-900 mb-2">
            {stats.firstConcertYear}
          </div>
          <div className="text-sm text-gray-600">First Concert</div>
        </div>
      </Card>
    </div>
  );
} 