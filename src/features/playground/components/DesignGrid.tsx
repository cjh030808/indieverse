'use client';

import { FanDesign } from '@/types/playground';
import { DesignCard } from './DesignCard';
import { cn } from '@/lib/utils';

interface DesignGridProps {
  designs: FanDesign[];
  className?: string;
  onDesignClick?: (design: FanDesign) => void;
}

export function DesignGrid({ designs, className, onDesignClick }: DesignGridProps) {
  if (designs.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <p className="text-gray-500 mb-4">아직 등록된 디자인이 없습니다.</p>
        <p className="text-sm text-gray-400">첫 번째 팬 디자인을 공유해보세요!</p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4', className)}>
      {designs.map((design) => (
        <DesignCard
          key={design.id}
          design={design}
          onClick={onDesignClick}
        />
      ))}
    </div>
  );
} 