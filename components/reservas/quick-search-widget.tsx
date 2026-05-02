'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useLocale, useTranslations } from 'next-intl';
import { CalendarDays, Users, Search, ChevronDown } from 'lucide-react';
import { format, addDays } from 'date-fns';
import { cn } from '@/lib/utils';

interface SearchState {
  checkin: Date | null;
  checkout: Date | null;
  adults: number;
  children: number;
}

export function QuickSearchWidget() {
  const t = useTranslations('hero.search');
  const locale = useLocale();
  const router = useRouter();
  const prefix = locale === 'en' ? '/en' : '';

  const [state, setState] = useState<SearchState>({
    checkin: null,
    checkout: null,
    adults: 2,
    children: 0,
  });
  const [guestsOpen, setGuestsOpen] = useState(false);

  const today = new Date();

  const nights =
    state.checkin && state.checkout
      ? Math.round(
          (state.checkout.getTime() - state.checkin.getTime()) / 86400000
        )
      : 0;

  const handleCheckinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = e.target.value ? new Date(e.target.value) : null;
    setState((prev) => ({
      ...prev,
      checkin: d,
      checkout: d && prev.checkout && prev.checkout <= d ? addDays(d, 1) : prev.checkout,
    }));
  };

  const handleCheckoutChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = e.target.value ? new Date(e.target.value) : null;
    setState((prev) => ({ ...prev, checkout: d }));
  };

  const handleSearch = () => {
    const params = new URLSearchParams();
    if (state.checkin) params.set('checkin', format(state.checkin, 'yyyy-MM-dd'));
    if (state.checkout) params.set('checkout', format(state.checkout, 'yyyy-MM-dd'));
    params.set('adults', String(state.adults));
    params.set('children', String(state.children));
    router.push(`${prefix}/reservar?${params.toString()}`);
  };

  const todayStr = format(today, 'yyyy-MM-dd');
  const minCheckout = state.checkin
    ? format(addDays(state.checkin, 1), 'yyyy-MM-dd')
    : todayStr;

  return (
    <div className="w-full max-w-4xl mx-auto">
      {/* Summary line */}
      {nights > 0 && (
        <p className="text-center font-inter text-sm text-white/80 mb-3 tracking-wide">
          {nights} {nights === 1 ? (locale === 'es' ? 'noche' : 'night') : locale === 'es' ? 'noches' : 'nights'}
          {' · '}
          {state.adults} {state.adults === 1 ? (locale === 'es' ? 'adulto' : 'adult') : locale === 'es' ? 'adultos' : 'adults'}
          {state.children > 0 && ` · ${state.children} ${locale === 'es' ? 'niños' : 'children'}`}
        </p>
      )}

      <div className="bg-white/10 backdrop-blur-md border border-white/20 rounded-sm overflow-visible relative">
        <div className="flex flex-col md:flex-row">

          {/* Check-in */}
          <div className="flex-1 relative border-b md:border-b-0 md:border-r border-white/15">
            <label className="absolute top-3 left-4 font-inter text-[10px] tracking-[0.15em] uppercase text-white/60">
              {t('checkin')}
            </label>
            <div className="flex items-center gap-2 px-4 pt-7 pb-3">
              <CalendarDays size={15} strokeWidth={1.5} className="text-hotel-gold flex-shrink-0" />
              <input
                type="date"
                min={todayStr}
                value={state.checkin ? format(state.checkin, 'yyyy-MM-dd') : ''}
                onChange={handleCheckinChange}
                aria-label={t('checkin')}
                className="flex-1 bg-transparent font-inter text-sm text-white placeholder-white/50 focus:outline-none cursor-pointer min-w-0"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>

          {/* Check-out */}
          <div className="flex-1 relative border-b md:border-b-0 md:border-r border-white/15">
            <label className="absolute top-3 left-4 font-inter text-[10px] tracking-[0.15em] uppercase text-white/60">
              {t('checkout')}
            </label>
            <div className="flex items-center gap-2 px-4 pt-7 pb-3">
              <CalendarDays size={15} strokeWidth={1.5} className="text-hotel-gold flex-shrink-0" />
              <input
                type="date"
                min={minCheckout}
                value={state.checkout ? format(state.checkout, 'yyyy-MM-dd') : ''}
                onChange={handleCheckoutChange}
                aria-label={t('checkout')}
                className="flex-1 bg-transparent font-inter text-sm text-white placeholder-white/50 focus:outline-none cursor-pointer min-w-0"
                style={{ colorScheme: 'dark' }}
              />
            </div>
          </div>

          {/* Guests */}
          <div className="flex-1 relative border-b md:border-b-0 md:border-r border-white/15">
            <label className="absolute top-3 left-4 font-inter text-[10px] tracking-[0.15em] uppercase text-white/60">
              {t('guests')}
            </label>
            <button
              onClick={() => setGuestsOpen(!guestsOpen)}
              aria-expanded={guestsOpen}
              aria-haspopup="true"
              className="w-full flex items-center gap-2 px-4 pt-7 pb-3 text-left hover:bg-white/5 transition-colors"
            >
              <Users size={15} strokeWidth={1.5} className="text-hotel-gold flex-shrink-0" />
              <span className="flex-1 font-inter text-sm text-white">
                {state.adults} {locale === 'es' ? 'adultos' : 'adults'}
                {state.children > 0 && `, ${state.children} ${locale === 'es' ? 'niños' : 'children'}`}
              </span>
              <ChevronDown
                size={13}
                strokeWidth={1.5}
                className={cn('text-white/50 transition-transform duration-200 flex-shrink-0', guestsOpen && 'rotate-180')}
              />
            </button>

            {/* Guests dropdown */}
            {guestsOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-hotel-surface dark:bg-hotel-dark-surface border border-hotel-border rounded-sm shadow-hotel-lg z-10 p-4">
                <GuestCounter
                  label={locale === 'es' ? 'Adultos' : 'Adults'}
                  sublabel={locale === 'es' ? 'Mayores de 12 años' : 'Ages 12+'}
                  value={state.adults}
                  min={1}
                  max={6}
                  onChange={(v) => setState((p) => ({ ...p, adults: v }))}
                />
                <div className="my-3 h-px bg-hotel-border" />
                <GuestCounter
                  label={locale === 'es' ? 'Niños' : 'Children'}
                  sublabel={locale === 'es' ? 'Menores de 12 años' : 'Under 12'}
                  value={state.children}
                  min={0}
                  max={4}
                  onChange={(v) => setState((p) => ({ ...p, children: v }))}
                />
                <button
                  onClick={() => setGuestsOpen(false)}
                  className="mt-4 w-full font-inter text-sm font-medium text-hotel-primary hover:text-hotel-deep transition-colors py-1"
                >
                  {locale === 'es' ? 'Aplicar' : 'Apply'}
                </button>
              </div>
            )}
          </div>

          {/* CTA */}
          <div className="flex items-stretch">
            <button
              onClick={handleSearch}
              className={cn(
                'flex items-center justify-center gap-2 w-full md:w-auto px-7 py-4 md:py-0',
                'bg-hotel-primary hover:bg-hotel-deep active:scale-[0.98]',
                'font-inter text-sm font-semibold text-white tracking-widest uppercase',
                'transition-all duration-300'
              )}
            >
              <Search size={15} strokeWidth={2} />
              <span className="hidden sm:inline">{t('cta')}</span>
              <span className="sm:hidden">{locale === 'es' ? 'Buscar' : 'Search'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface GuestCounterProps {
  label: string;
  sublabel: string;
  value: number;
  min: number;
  max: number;
  onChange: (v: number) => void;
}

function GuestCounter({ label, sublabel, value, min, max, onChange }: GuestCounterProps) {
  return (
    <div className="flex items-center justify-between">
      <div>
        <p className="font-inter text-sm font-medium text-hotel-text">{label}</p>
        <p className="font-inter text-xs text-hotel-text-tertiary">{sublabel}</p>
      </div>
      <div className="flex items-center gap-3">
        <button
          onClick={() => onChange(Math.max(min, value - 1))}
          disabled={value <= min}
          aria-label={`Reducir ${label}`}
          className="w-7 h-7 rounded-full border border-hotel-border flex items-center justify-center font-inter text-sm text-hotel-text-secondary hover:border-hotel-gold hover:text-hotel-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          −
        </button>
        <span className="font-inter text-sm font-medium text-hotel-text w-4 text-center">
          {value}
        </span>
        <button
          onClick={() => onChange(Math.min(max, value + 1))}
          disabled={value >= max}
          aria-label={`Aumentar ${label}`}
          className="w-7 h-7 rounded-full border border-hotel-border flex items-center justify-center font-inter text-sm text-hotel-text-secondary hover:border-hotel-gold hover:text-hotel-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
        >
          +
        </button>
      </div>
    </div>
  );
}
