'use client';

import { Header } from '@/components/layout/Header';
import { StoryHeader } from '@/features/stories/components/StoryHeader';
import { StoriesFeed } from '@/features/stories/components/StoriesFeed';
import { useBandMembers } from '@/features/stories/hooks/useStories';
import { cn } from '@/lib/utils';
import { Music, Play, Headphones, Radio, Disc3, Heart, Star } from 'lucide-react';

export default function DashboardPage() {
  const { data: members, isLoading: membersLoading } = useBandMembers();

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Music-themed Hero Section */}
        <div className="relative mb-12 p-8 rounded-2xl bg-gradient-to-r from-purple-800/30 to-pink-800/30 backdrop-blur-sm border border-white/10">
          <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full">
                <Music className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Welcome to Indieverse</h1>
                <p className="text-purple-200">독립 음악의 새로운 세계를 탐험하세요</p>
              </div>
            </div>
            
            {/* Quick Actions */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <button className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 group">
                <Play className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-white font-medium">지금 재생</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 group">
                <Headphones className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-white font-medium">발견하기</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 group">
                <Radio className="w-6 h-6 text-orange-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-white font-medium">라이브</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 group">
                <Heart className="w-6 h-6 text-red-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-white font-medium">찜목록</span>
              </button>
            </div>
          </div>
          
          {/* Floating Music Notes Animation */}
          <div className="absolute top-4 right-4 opacity-20">
            <div className="animate-bounce">
              <Disc3 className="w-12 h-12 text-white animate-spin" style={{ animationDuration: '3s' }} />
            </div>
          </div>
        </div>

        {/* Band Members Section with Music Theme */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Star className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">밴드 멤버들</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-purple-500 to-transparent"></div>
          </div>
          
          {membersLoading ? (
            <div className="flex gap-4 overflow-x-auto pb-4">
              {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className="flex flex-col items-center gap-2 min-w-[80px] animate-pulse">
                  <div className="w-20 h-20 bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-full border-2 border-purple-500/30"></div>
                  <div className="w-16 h-4 bg-gray-600 rounded-full"></div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex gap-4 overflow-x-auto pb-4">
              {(members || []).map((member, index) => (
                <div key={member.id} className="flex flex-col items-center gap-3 min-w-[80px] group cursor-pointer">
                  <div className="relative">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 p-0.5 group-hover:from-purple-400 group-hover:to-pink-400 transition-all duration-300">
                      <div className="w-full h-full rounded-full bg-gray-800 flex items-center justify-center overflow-hidden">
                        {member.image ? (
                          <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                        ) : (
                          <span className="text-2xl font-bold text-white">{member.name[0]}</span>
                        )}
                      </div>
                    </div>
                    {/* Online/Active Indicator */}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-2 border-gray-900 flex items-center justify-center">
                      <Music className="w-3 h-3 text-white" />
                    </div>
                  </div>
                  <span className="text-sm text-white font-medium text-center group-hover:text-purple-300 transition-colors">
                    {member.name}
                  </span>
                  <div className="flex gap-1">
                    {Array.from({ length: 3 }).map((_, starIndex) => (
                      <Star key={starIndex} className="w-3 h-3 text-yellow-400 fill-current" />
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Stories Feed with Dark Theme */}
        <div className="mb-6">
          <div className="flex items-center gap-3 mb-6">
            <Disc3 className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">최신 소식</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
          </div>
        </div>
        
        <div className="space-y-6">
          <StoriesFeed />
        </div>
      </main>
    </div>
  );
} 