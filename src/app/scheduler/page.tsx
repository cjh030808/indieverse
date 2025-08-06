'use client';

import { Header } from '@/components/layout/Header';
import { Card } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Calendar, Clock, MapPin, Mic2, Music2, Users, Sparkles, Star } from 'lucide-react';

export default function SchedulerPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Music-themed Hero Section */}
        <div className="relative mb-12 p-8 rounded-2xl bg-gradient-to-r from-cyan-800/30 to-blue-800/30 backdrop-blur-sm border border-white/10">
          <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full">
                <Calendar className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Schedule Manager</h1>
                <p className="text-cyan-200">밴드의 모든 일정을 한곳에서 관리하세요</p>
              </div>
            </div>
          </div>
          
          {/* Floating Animation */}
          <div className="absolute top-4 right-4 opacity-20">
            <div className="animate-pulse">
              <Music2 className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Coming Soon Card with Music Theme */}
        <div className="relative">
          <div className="flex items-center gap-3 mb-8">
            <Clock className="w-6 h-6 text-blue-400" />
            <h2 className="text-2xl font-bold text-white">곧 출시 예정</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-blue-500 to-transparent"></div>
          </div>

          <Card className="p-8 bg-gradient-to-r from-gray-800/40 to-gray-900/40 border border-white/10 backdrop-blur-sm">
            <div className="text-center">
              <div className="mb-6">
                <div className="w-20 h-20 mx-auto bg-gradient-to-r from-cyan-500 to-blue-500 rounded-full flex items-center justify-center mb-4">
                  <Mic2 className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-semibold text-white mb-4">
                  공연 일정 관리 시스템
                </h2>
                <p className="text-gray-300 mb-8 max-w-2xl mx-auto">
                  밴드의 공식 일정을 체계적으로 관리하고 팬들에게 정확한 정보를 제공하는 
                  전문적인 스케줄링 도구가 곧 출시됩니다.
                </p>
              </div>

              {/* Feature Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <Calendar className="w-8 h-8 text-cyan-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">일정 관리</h3>
                  <p className="text-gray-400 text-sm">공연, 연습, 미팅 일정을 한눈에 관리</p>
                </div>
                <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <MapPin className="w-8 h-8 text-green-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">장소 정보</h3>
                  <p className="text-gray-400 text-sm">공연장 위치와 상세 정보 제공</p>
                </div>
                <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <Users className="w-8 h-8 text-purple-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">팬 알림</h3>
                  <p className="text-gray-400 text-sm">팬들에게 자동 일정 알림 발송</p>
                </div>
                <div className="p-6 bg-white/5 rounded-xl border border-white/10 hover:bg-white/10 transition-colors">
                  <Star className="w-8 h-8 text-yellow-400 mx-auto mb-4" />
                  <h3 className="text-white font-semibold mb-2">특별 이벤트</h3>
                  <p className="text-gray-400 text-sm">팬미팅, 사인회 등 특별 활동 관리</p>
                </div>
              </div>

              {/* Feature List */}
              <div className="text-left bg-white/5 rounded-xl p-6 border border-white/10">
                <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-yellow-400" />
                  주요 기능
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-gray-300">
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-cyan-400 rounded-full"></div>
                    <span>공연 일정 등록 및 관리</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                    <span>팬미팅, TV 출연 등 다양한 활동 일정</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                    <span>캘린더 및 리스트 뷰 지원</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-pink-400 rounded-full"></div>
                    <span>예매 링크 및 티켓팅 연동</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                    <span>실시간 일정 변경 알림</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-2 h-2 bg-orange-400 rounded-full"></div>
                    <span>소셜 미디어 자동 공유</span>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </main>
    </div>
  );
} 