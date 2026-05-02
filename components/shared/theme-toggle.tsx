'use client';

import { useTheme } from 'next-themes';
import { Sun, Moon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useEffect, useState } from 'react';

interface ThemeToggleProps {
  className?: string;
  variant?: 'default' | 'light';
}

export function ThemeToggle({ className, variant = 'default' }: ThemeToggleProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) {
    return <div className={cn('w-8 h-8', className)} />;
  }

  const isDark = theme === 'dark';
  const isLight = variant === 'light';

  return (
    <button
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className={cn(
        'flex items-center justify-center w-8 h-8 rounded-sm transition-all duration-200',
        isLight
          ? 'text-white/70 hover:text-white'
          : 'text-hotel-text-secondary hover:text-hotel-primary',
        className
      )}
    >
      {isDark ? (
        <Sun size={16} strokeWidth={1.5} />
      ) : (
        <Moon size={16} strokeWidth={1.5} />
      )}
    </button>
  );
}
