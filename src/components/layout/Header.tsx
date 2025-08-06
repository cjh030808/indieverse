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
  { href: '/dashboard', label: 'Home' },
  { href: '/scheduler', label: 'Scheduler' },
  { href: '/passport', label: 'Indie Passport' },
  { href: '/playground', label: 'Playground' },
];

export function Header({ className }: HeaderProps) {
  const pathname = usePathname();

  return (
    <header className={cn('border-b border-white/10 bg-black/20 backdrop-blur-md', className)}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-sm">I</span>
            </div>
            <span className="text-xl font-bold text-white">Indieverse</span>
          </div>

          {/* Navigation */}
          <nav className="hidden md:flex items-center gap-8">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'font-medium transition-colors relative',
                  pathname === item.href
                    ? 'text-purple-400'
                    : 'text-gray-300 hover:text-purple-300'
                )}
              >
                {item.label}
                {pathname === item.href && (
                  <div className="absolute -bottom-1 left-0 right-0 h-0.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                )}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-white/10 rounded-lg">
              <Search className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-400 hover:text-white transition-colors hover:bg-white/10 rounded-lg relative">
              <Bell className="w-5 h-5" />
              <div className="absolute -top-1 -right-1 w-3 h-3 bg-red-500 rounded-full"></div>
            </button>
            <Avatar className="w-10 h-10 cursor-pointer ring-2 ring-purple-500/30 hover:ring-purple-400/50 transition-all">
              <AvatarImage src="https://picsum.photos/40/40" alt="User" />
              <AvatarFallback className="bg-gradient-to-r from-purple-500 to-pink-500 text-white">
                <User className="w-5 h-5" />
              </AvatarFallback>
            </Avatar>
          </div>
        </div>
      </div>
    </header>
  );
} 