'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { FilterBar } from '@/features/playground/components/FilterBar';
import { DesignGrid } from '@/features/playground/components/DesignGrid';
import { CreateButton } from '@/features/playground/components/CreateButton';
import { useFanDesigns } from '@/features/playground/hooks/usePlayground';
import { FanDesign, SortOption } from '@/types/playground';
import { cn } from '@/lib/utils';
import { Palette, Shirt, Coffee, ShoppingBag, Brush, Sparkles, Star } from 'lucide-react';

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
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Creative Hero Section */}
        <div className="relative mb-12 p-8 rounded-2xl bg-gradient-to-r from-emerald-800/30 to-teal-800/30 backdrop-blur-sm border border-white/10">
          <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-emerald-500 to-teal-500 rounded-full">
                <Palette className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Goods Playground</h1>
                <p className="text-emerald-200">팬들의 창의력이 만나는 굿즈 놀이터</p>
              </div>
            </div>
            
            {/* Creative Categories */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 group">
                <Shirt className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-white font-medium">의류</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 group">
                <Coffee className="w-6 h-6 text-amber-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-white font-medium">생활용품</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 group">
                <ShoppingBag className="w-6 h-6 text-pink-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-white font-medium">액세서리</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 group">
                <Star className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-white font-medium">특별 굿즈</span>
              </button>
            </div>
          </div>
          
          {/* Floating Design Elements */}
          <div className="absolute top-4 right-4 opacity-20">
            <div className="animate-bounce">
              <Brush className="w-12 h-12 text-white" />
            </div>
          </div>
          <div className="absolute bottom-4 left-4 opacity-10">
            <div className="animate-pulse">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
          </div>
        </div>

        {/* Filter Bar with Dark Theme */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Palette className="w-6 h-6 text-emerald-400" />
            <h2 className="text-2xl font-bold text-white">디자인 갤러리</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-emerald-500 to-transparent"></div>
          </div>
          <FilterBar onFilterChange={handleFilterChange} />
        </div>

        {/* Designs Grid */}
        <div className="mb-8">
          {isLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-lg aspect-[3/4] mb-4 border border-white/10"></div>
                  <div className="bg-gray-600 rounded h-4 mb-2"></div>
                  <div className="bg-gray-600 rounded h-3 mb-2"></div>
                  <div className="flex gap-2">
                    <div className="bg-gray-600 rounded h-3 w-8"></div>
                    <div className="bg-gray-600 rounded h-3 w-8"></div>
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
        <div className="flex justify-center">
          <CreateButton onClick={handleCreateDesign} />
        </div>
      </main>
    </div>
  );
} 