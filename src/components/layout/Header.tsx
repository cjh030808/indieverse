'use client';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Search, Bell, User } from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';

interface HeaderProps {
  className?: string;
}

const navigationItems = [
  { href: '/home', label: 'Home' },
  { href: '/scheduler', label: 'Scheduler' },
  { href: '/passport', label: 'Indie Passport' },
  { href: '/playground', label: 'Playground' },
];

export function Header({ className }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className={cn('border-b border-gray-200 bg-white', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="/home" className="flex items-center gap-3">
            <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">I</span>
            </div>
            <span className="text-xl font-bold text-gray-900">Indieverse</span>
          </a>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'font-medium transition-colors',
                  pathname === item.href
                    ? 'text-indigo-600'
                    : 'text-gray-900 hover:text-indigo-600'
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-500 hover:text-gray-700 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <Avatar className="w-10 h-10 cursor-pointer">
              <AvatarImage src="https://picsum.photos/40/40" alt="User" />
              <AvatarFallback>
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
} 