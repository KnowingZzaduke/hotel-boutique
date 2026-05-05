'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from 'next/navigation';
import { useTransition } from 'react';
import { cn } from '@/lib/utils';

interface LanguageToggleProps {
  className?: string;
  variant?: 'default' | 'light';
}

export function LanguageToggle({ className, variant = 'default' }: LanguageToggleProps) {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const [isPending, startTransition] = useTransition();

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale || isPending) return;

    const isCurrentEn = pathname.startsWith('/en');
    let newPath: string;

    if (newLocale === 'en') {
      newPath = isCurrentEn ? pathname : `/en${pathname}`;
    } else {
      newPath = isCurrentEn ? pathname.replace(/^\/en/, '') || '/' : pathname;
    }

    startTransition(() => {
      router.push(newPath);
    });
  };

  const isLight = variant === 'light';

  return (
    <div
      className={cn(
        'flex items-center gap-0.5 font-inter text-xs font-medium tracking-widest uppercase',
        isPending && 'opacity-60 pointer-events-none',
        className
      )}
      role="group"
      aria-label="Language selector"
    >
      <button
        onClick={() => switchLocale('es')}
        aria-pressed={locale === 'es'}
        aria-label="Cambiar a español"
        disabled={isPending}
        className={cn(
          'px-1.5 py-0.5 rounded-sm transition-all duration-200',
          locale === 'es'
            ? isLight
              ? 'text-white font-semibold'
              : 'text-hotel-primary font-semibold'
            : isLight
            ? 'text-white/50 hover:text-white/80'
            : 'text-hotel-text-tertiary hover:text-hotel-text-secondary'
        )}
      >
        ES
      </button>
      <span className={cn('text-[10px]', isLight ? 'text-white/30' : 'text-hotel-text-tertiary')}>
        |
      </span>
      <button
        onClick={() => switchLocale('en')}
        aria-pressed={locale === 'en'}
        aria-label="Switch to English"
        disabled={isPending}
        className={cn(
          'px-1.5 py-0.5 rounded-sm transition-all duration-200',
          locale === 'en'
            ? isLight
              ? 'text-white font-semibold'
              : 'text-hotel-primary font-semibold'
            : isLight
            ? 'text-white/50 hover:text-white/80'
            : 'text-hotel-text-tertiary hover:text-hotel-text-secondary'
        )}
      >
        EN
      </button>
    </div>
  );
}
