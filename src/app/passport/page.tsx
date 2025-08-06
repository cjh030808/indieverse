'use client';

import { useState } from 'react';
import { Header } from '@/components/layout/Header';
import { PassportStats } from '@/features/passport/components/PassportStats';
import { TicketGrid } from '@/features/passport/components/TicketGrid';
import { AddTicketButton } from '@/features/passport/components/AddTicketButton';
import { useTickets, usePassportStats } from '@/features/passport/hooks/usePassport';
import { Ticket } from '@/types/passport';
import { cn } from '@/lib/utils';
import { Ticket as TicketIcon, Map, Calendar, Trophy, Sparkles } from 'lucide-react';

export default function PassportPage() {
  const { data: tickets, isLoading: ticketsLoading } = useTickets();
  const { data: stats, isLoading: statsLoading } = usePassportStats();
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  const handleTicketClick = (ticket: Ticket) => {
    setSelectedTicket(ticket);
    // TODO: 티켓 상세 모달 또는 페이지로 이동
    console.log('Selected ticket:', ticket);
  };

  const handleAddTicket = () => {
    // TODO: 티켓 추가 모달 또는 페이지로 이동
    console.log('Add ticket clicked');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900">
      <Header />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Music-themed Hero Section */}
        <div className="relative mb-12 p-8 rounded-2xl bg-gradient-to-r from-orange-800/30 to-red-800/30 backdrop-blur-sm border border-white/10">
          <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>
          <div className="relative z-10">
            <div className="flex items-center gap-4 mb-6">
              <div className="p-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full">
                <TicketIcon className="w-8 h-8 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-white mb-2">Indie Passport</h1>
                <p className="text-orange-200">당신의 인디 음악 여행을 기록하세요</p>
              </div>
            </div>
            
            {/* Quick Navigation */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <button className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 group">
                <Map className="w-6 h-6 text-blue-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-white font-medium">공연장 맵</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 group">
                <Calendar className="w-6 h-6 text-green-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-white font-medium">일정 보기</span>
              </button>
              <button className="flex flex-col items-center gap-2 p-4 bg-white/10 rounded-xl hover:bg-white/20 transition-all duration-300 group">
                <Trophy className="w-6 h-6 text-yellow-400 group-hover:scale-110 transition-transform" />
                <span className="text-sm text-white font-medium">업적</span>
              </button>
            </div>
          </div>
          
          {/* Floating Animation */}
          <div className="absolute top-4 right-4 opacity-20">
            <div className="animate-pulse">
              <Sparkles className="w-12 h-12 text-white" />
            </div>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Trophy className="w-6 h-6 text-yellow-400" />
            <h2 className="text-2xl font-bold text-white">나의 음악 여행</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-yellow-500 to-transparent"></div>
          </div>
          
          {statsLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {Array.from({ length: 3 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gradient-to-r from-purple-400/30 to-pink-400/30 rounded-lg h-24 border border-white/10"></div>
                </div>
              ))}
            </div>
          ) : (
            <PassportStats stats={stats!} />
          )}
        </div>

        {/* Concert History Section */}
        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <TicketIcon className="w-6 h-6 text-pink-400" />
            <h2 className="text-2xl font-bold text-white">Concert History</h2>
            <div className="flex-1 h-px bg-gradient-to-r from-pink-500 to-transparent"></div>
          </div>

          {ticketsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
              {Array.from({ length: 10 }).map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="bg-gradient-to-r from-purple-400/20 to-pink-400/20 rounded-lg aspect-square mb-4 border border-white/10"></div>
                  <div className="bg-gray-600 rounded h-4 mb-2"></div>
                  <div className="bg-gray-600 rounded h-3"></div>
                </div>
              ))}
            </div>
          ) : (
            <TicketGrid
              tickets={tickets || []}
              onTicketClick={handleTicketClick}
            />
          )}
        </div>

        {/* Add Ticket Button */}
        <div className="flex justify-center">
          <AddTicketButton onClick={handleAddTicket} />
        </div>
      </main>
    </div>
  );
} 