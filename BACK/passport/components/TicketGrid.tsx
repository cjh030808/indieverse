'use client';

import { Ticket } from '@/types/passport';
import { TicketCard } from './TicketCard';
import { cn } from '@/lib/utils';

interface TicketGridProps {
  tickets: Ticket[];
  className?: string;
  onTicketClick?: (ticket: Ticket) => void;
}

export function TicketGrid({ tickets, className, onTicketClick }: TicketGridProps) {
  if (tickets.length === 0) {
    return (
      <div className={cn('text-center py-12', className)}>
        <p className="text-gray-500 mb-4">아직 등록된 티켓이 없습니다.</p>
        <p className="text-sm text-gray-400">첫 번째 콘서트 티켓을 등록해보세요!</p>
      </div>
    );
  }

  return (
    <div className={cn('grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4', className)}>
      {tickets.map((ticket) => (
        <TicketCard
          key={ticket.id}
          ticket={ticket}
          onClick={onTicketClick}
        />
      ))}
    </div>
  );
} 