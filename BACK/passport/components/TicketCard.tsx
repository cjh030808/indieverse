'use client';

import { Card } from '@/components/ui/card';
import { Ticket } from '@/types/passport';
import { cn } from '@/lib/utils';

interface TicketCardProps {
  ticket: Ticket;
  className?: string;
  onClick?: (ticket: Ticket) => void;
}

export function TicketCard({ ticket, className, onClick }: TicketCardProps) {
  const handleClick = () => {
    onClick?.(ticket);
  };

  return (
    <Card
      className={cn('overflow-hidden cursor-pointer hover:shadow-lg transition-shadow', className)}
      onClick={handleClick}
    >
      <div className="aspect-square">
        <img
          src={ticket.ticketImage}
          alt={`${ticket.concertName} ticket`}
          className="w-full h-full object-cover"
        />
      </div>
      <div className="p-4">
        <h3 className="font-medium text-gray-900 mb-1 truncate">
          {ticket.bandName}
        </h3>
        <p className="text-sm text-gray-600">
          {ticket.eventDate}
        </p>
      </div>
    </Card>
  );
} 