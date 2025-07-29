'use client';

import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { cn } from '@/lib/utils';

interface CreateButtonProps {
  onClick: () => void;
  className?: string;
}

export function CreateButton({ onClick, className }: CreateButtonProps) {
  return (
    <Button
      onClick={onClick}
      className={cn('bg-black text-white hover:bg-gray-800', className)}
    >
      <Plus className="w-5 h-5" />
    </Button>
  );
} 