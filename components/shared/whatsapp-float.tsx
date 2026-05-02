'use client';

import { useTranslations } from 'next-intl';
import { MessageCircle } from 'lucide-react';
import { useState } from 'react';
import { cn } from '@/lib/utils';

const WHATSAPP_URL =
  'https://wa.me/573052345678?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20en%20Casa%20Boutique%20San%20Diego.';

export function WhatsappFloat() {
  const t = useTranslations('whatsapp');
  const [hovered, setHovered] = useState(false);

  return (
    <div className="fixed bottom-6 right-6 z-40 flex items-center gap-3">
      {/* Tooltip */}
      <span
        className={cn(
          'font-inter text-xs font-medium text-hotel-text bg-hotel-surface border border-hotel-border rounded-sm px-3 py-1.5 shadow-hotel whitespace-nowrap',
          'transition-all duration-300',
          hovered ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-2 pointer-events-none'
        )}
      >
        {t('tooltip')}
      </span>

      {/* Button */}
      <a
        href={WHATSAPP_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label={t('tooltip')}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className={cn(
          'flex items-center justify-center w-13 h-13 rounded-full shadow-hotel-lg',
          'bg-hotel-primary hover:bg-hotel-deep',
          'text-white transition-all duration-300',
          'hover:shadow-gold active:scale-95',
          'animate-pulse-slow'
        )}
        style={{ width: '52px', height: '52px' }}
      >
        <MessageCircle size={22} strokeWidth={1.5} />
      </a>
    </div>
  );
}
