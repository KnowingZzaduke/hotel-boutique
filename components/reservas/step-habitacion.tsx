'use client';

import { useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { Check } from 'lucide-react';
import { ROOMS, formatPriceCOP } from '@/lib/rooms-data';
import type { Room } from '@/types/room';
import type { BookingState } from '@/types/reservation';
import { cn } from '@/lib/utils';

interface Props {
  state: BookingState;
  nights: number;
  onNext: (updates: Partial<BookingState>) => void;
  onBack: () => void;
}

export function StepHabitacion({ state, nights, onNext, onBack }: Props) {
  const t    = useTranslations('rooms');
  const locale = useLocale();
  const lang   = (locale === 'en' ? 'en' : 'es') as 'en' | 'es';

  const [selected, setSelected] = useState<Room['slug'] | null>(state.roomSlug);
  const totalGuests = state.adults + state.children;

  const L = {
    title:    { es: 'Elige tu habitación', en: 'Choose your room'                      },
    nights:   { es: `${nights} noche${nights !== 1 ? 's' : ''}`, en: `${nights} night${nights !== 1 ? 's' : ''}` },
    guests:   { es: `${totalGuests} huésped${totalGuests !== 1 ? 'es' : ''}`, en: `${totalGuests} guest${totalGuests !== 1 ? 's' : ''}` },
    total:    { es: 'Total estancia',      en: 'Total stay'                            },
    per:      { es: '/ noche',             en: '/ night'                               },
    upTo:     { es: 'hasta',               en: 'up to'                                 },
    guestsLbl:{ es: 'huéspedes',           en: 'guests'                                },
    unavail:  { es: 'No disponible para este número de huéspedes', en: 'Not available for this guest count' },
    back:     { es: 'Volver',             en: 'Back'                                   },
    continue: { es: 'Continuar',          en: 'Continue'                               },
    noSel:    { es: 'Selecciona una habitación', en: 'Select a room'                   },
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-playfair text-2xl text-hotel-text">{L.title[lang]}</h2>
        <p className="font-inter text-sm text-hotel-text-secondary mt-1">
          {L.nights[lang]} &middot; {L.guests[lang]}
        </p>
      </div>

      <div className="space-y-3 mb-8">
        {ROOMS.map((room) => {
          const available  = room.maxGuests >= totalGuests;
          const isSelected = selected === room.slug;
          const nightPrice = locale === 'en' ? room.priceUSD : room.priceCOP;
          const stayTotal  = nightPrice * Math.max(nights, 1);
          const fmtPrice   = locale === 'en' ? `$${stayTotal} USD` : formatPriceCOP(stayTotal);

          return (
            <button
              key={room.slug}
              onClick={() => available && setSelected(room.slug)}
              disabled={!available}
              aria-pressed={isSelected}
              className={cn(
                'w-full text-left border rounded-sm transition-all duration-300 overflow-hidden group',
                isSelected
                  ? 'border-hotel-primary shadow-hotel-lg bg-hotel-primary/4'
                  : 'border-hotel-border shadow-hotel hover:border-hotel-gold',
                !available && 'opacity-50 cursor-not-allowed'
              )}
            >
              <div className="flex">
                <div className="relative w-28 sm:w-40 shrink-0 self-stretch">
                  <Image
                    src={room.imageUrl}
                    alt={room.imageAlt[lang]}
                    fill
                    className="object-cover"
                    sizes="160px"
                  />
                </div>
                <div className="flex-1 p-4 sm:p-5">
                  <div className="flex items-start justify-between gap-3 mb-1">
                    <div>
                      <h3 className="font-playfair text-lg text-hotel-text leading-tight">
                        {t(`${room.slug}.name`)}
                      </h3>
                      <p className="font-cormorant italic text-hotel-gold text-[0.95rem] leading-snug">
                        {t(`${room.slug}.tagline`)}
                      </p>
                    </div>
                    {isSelected && (
                      <div className="w-6 h-6 rounded-full bg-hotel-primary flex items-center justify-center shrink-0">
                        <Check size={12} strokeWidth={2.5} className="text-white" />
                      </div>
                    )}
                  </div>

                  <p className="font-inter text-xs text-hotel-text-tertiary mb-3">
                    {room.sqm} m² &middot; {L.upTo[lang]} {room.maxGuests} {L.guestsLbl[lang]}
                  </p>

                  {!available && (
                    <p className="font-inter text-xs text-red-500">{L.unavail[lang]}</p>
                  )}

                  {available && (
                    <div className="pt-3 border-t border-hotel-border">
                      <span className="font-inter text-[11px] uppercase tracking-wide text-hotel-text-tertiary">
                        {L.total[lang]}
                      </span>
                      <p className="font-cormorant text-xl text-hotel-text font-light leading-none mt-0.5">
                        {fmtPrice}
                      </p>
                      <span className="font-inter text-xs text-hotel-text-tertiary">
                        {locale === 'en' ? `($${room.priceUSD}` : formatPriceCOP(nightPrice)} {L.per[lang]})
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-hotel-outline">{L.back[lang]}</button>
        <button
          onClick={() => selected && onNext({ roomSlug: selected })}
          disabled={!selected}
          className="btn-hotel-primary disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {selected ? L.continue[lang] : L.noSel[lang]}
        </button>
      </div>
    </div>
  );
}
