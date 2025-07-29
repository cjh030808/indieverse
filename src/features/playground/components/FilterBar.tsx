'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { SortOption } from '@/types/playground';
import { cn } from '@/lib/utils';

interface FilterBarProps {
  onFilterChange: (filters: {
    band?: string;
    itemType?: string;
    sortBy: SortOption;
  }) => void;
  className?: string;
}

const sortOptions: { value: SortOption; label: string }[] = [
  { value: 'band', label: 'Band' },
  { value: 'itemType', label: 'Item Type' },
  { value: 'popularity', label: 'Popularity' },
  { value: 'recency', label: 'Recency' },
];

export function FilterBar({ onFilterChange, className }: FilterBarProps) {
  const [activeSort, setActiveSort] = useState<SortOption>('recency');

  const handleSortChange = (sortBy: SortOption) => {
    setActiveSort(sortBy);
    onFilterChange({ sortBy });
  };

  return (
    <div className={cn('flex gap-2 overflow-x-auto pb-2', className)}>
      {sortOptions.map((option) => (
        <button
          key={option.value}
          onClick={() => handleSortChange(option.value)}
          className={cn(
            'flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-colors whitespace-nowrap',
            activeSort === option.value
              ? 'bg-gray-200 text-gray-900'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          )}
        >
          {option.label}
          <ChevronDown className="w-4 h-4" />
        </button>
      ))}
    </div>
  );
} 