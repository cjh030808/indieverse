'use client';

import { ReactNode } from 'react';
import { Header } from '@/components/layout/Header';

interface SchedulerLayoutProps {
  children: ReactNode;
}

export default function SchedulerLayout({ children }: SchedulerLayoutProps) {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
} 