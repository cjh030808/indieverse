'use client';

import { useState } from 'react';
import { PassportStats } from '@/features/passport/components/PassportStats';
import { TicketGrid } from '@/features/passport/components/TicketGrid';
import { AddTicketButton } from '@/features/passport/components/AddTicketButton';
import { useTickets, usePassportStats } from '@/features/passport/hooks/usePassport';
import { Ticket } from '@/types/passport';
import { cn } from '@/lib/utils';

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
    <>
      {/* Page Title */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Indie Passport</h1>
      </div>

      {/* Stats Section */}
      <div className="mb-8">
        {statsLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {Array.from({ length: 3 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg h-24"></div>
              </div>
            ))}
          </div>
        ) : (
          <PassportStats stats={stats!} />
        )}
      </div>

      {/* Concert History Section */}
      <div className="mb-8">
        <h2 className="text-xl font-bold text-gray-900 mb-4">Concert History</h2>

        {ticketsLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
            {Array.from({ length: 10 }).map((_, index) => (
              <div key={index} className="animate-pulse">
                <div className="bg-gray-200 rounded-lg aspect-square mb-4"></div>
                <div className="bg-gray-200 rounded h-4 mb-2"></div>
                <div className="bg-gray-200 rounded h-3"></div>
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
      <div className="flex justify-end">
        <AddTicketButton onClick={handleAddTicket} />
      </div>
    </>
  );
} 