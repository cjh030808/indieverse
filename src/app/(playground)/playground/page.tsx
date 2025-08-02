'use client';

import { useState } from 'react';
import { FilterBar } from '@/features/playground/components/FilterBar';
import { DesignGrid } from '@/features/playground/components/DesignGrid';
import { CreateButton } from '@/features/playground/components/CreateButton';
import { useFanDesigns } from '@/features/playground/hooks/usePlayground';
import { FanDesign, SortOption } from '@/types/playground';
import { cn } from '@/lib/utils';

export default function PlaygroundPage() {
  const { data: designs, isLoading } = useFanDesigns();
  const [selectedDesign, setSelectedDesign] = useState<FanDesign | null>(null);

  const handleFilterChange = (filters: {
    band?: string;
    itemType?: string;
    sortBy: SortOption;
  }) => {
    // TODO: 필터링 및 정렬 로직 구현
    console.log('Filter changed:', filters);
  };

  const handleDesignClick = (design: FanDesign) => {
    setSelectedDesign(design);
    // TODO: 디자인 상세 모달 또는 페이지로 이동
    console.log('Selected design:', design);
  };

  const handleCreateDesign = () => {
    // TODO: 디자인 생성 모달 또는 페이지로 이동
    console.log('Create design clicked');
  };

  return (
    <>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Goods Playground</h1>
        <p className="text-gray-600 mt-2">Explore fan-made designs and merchandise</p>
      </div>

      {/* Filter Bar */}
      <div className="mb-8">
        <FilterBar onFilterChange={handleFilterChange} />
      </div>

      {/* Designs Grid */}
      <div className="mb-8">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg aspect-[3/4] mb-4"></div>
                <div className="bg-gray-200 rounded h-4 mb-2"></div>
                <div className="bg-gray-200 rounded h-3 mb-2"></div>
                <div className="flex gap-2">
                  <div className="bg-gray-200 rounded h-3 w-8"></div>
                  <div className="bg-gray-200 rounded h-3 w-8"></div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <DesignGrid
            designs={designs || []}
            onDesignClick={handleDesignClick}
          />
        )}
      </div>

      {/* Create Button */}
      <div className="flex justify-end">
        <CreateButton onClick={handleCreateDesign} />
      </div>
    </>
  );
} 