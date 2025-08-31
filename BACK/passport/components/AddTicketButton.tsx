'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface AddTicketButtonProps {
  onClick: () => void;
  className?: string;
}

export function AddTicketButton({ onClick, className }: AddTicketButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn('bg-black text-white hover:bg-gray-800', className)}
    >
      <Plus className="w-5 h-5 mr-2" />
      Add Record
    </Button>
  );
} 