'use client';

import { useLocale } from 'next-intl';
import { differenceInCalendarDays, format } from 'date-fns';
import { CalendarDays, BedDouble, Sparkles } from 'lucide-react';
import { ROOMS, formatPriceCOP } from '@/lib/rooms-data';
import { EXTRAS, calcExtraPrice, calcExtraPriceUSD } from '@/lib/extras-data';
import type { BookingState } from '@/types/reservation';

interface Props {
  state: BookingState;
}

export function BookingSummary({ state }: Props) {
  const locale = useLocale();
  const lang   = (locale === 'en' ? 'en' : 'es') as 'en' | 'es';

  const nights = state.checkIn && state.checkOut
    ? differenceInCalendarDays(state.checkOut, state.checkIn)
    : 0;

  const room = ROOMS.find((r) => r.slug === state.roomSlug) ?? null;

  const roomNightPrice = room ? (locale === 'en' ? room.priceUSD : room.priceCOP) : 0;
  const roomTotal      = roomNightPrice * Math.max(nights, 1);

  const selectedExtras = EXTRAS.filter((e) => state.extras.includes(e.id));
  const extrasTotal    = selectedExtras.reduce(
    (acc, e) =>
      acc + (locale === 'en'
        ? calcExtraPriceUSD(e, state.adults, nights)
        : calcExtraPrice(e, state.adults, nights)),
    0
  );

  const grandTotal = roomTotal + extrasTotal;

  const fmt = (n: number) =>
    locale === 'en' ? `$${n.toLocaleString('en-US')} USD` : formatPriceCOP(n);

  const dateStr = state.checkIn && state.checkOut
    ? `${format(state.checkIn, 'MMM d')} – ${format(state.checkOut, 'MMM d, yyyy')}`
    : null;

  const L = {
    title:    { es: 'Resumen',                    en: 'Summary'                     },
    empty:    { es: 'Selecciona fechas y habitación para ver el resumen.', en: 'Select dates and a room to see your summary.' },
    nights:   { es: (n: number) => `${n} noche${n !== 1 ? 's' : ''}`, en: (n: number) => `${n} night${n !== 1 ? 's' : ''}` },
    guests:   { es: 'huésped',                    en: 'guest'                       },
    room:     { es: 'Alojamiento',                en: 'Accommodation'               },
    extras:   { es: 'Extras',                     en: 'Extras'                      },
    subtotal: { es: 'Total estancia',             en: 'Stay total'                  },
    taxes:    { es: 'Impuestos incluidos',         en: 'Taxes included'              },
    perNight: { es: '/ noche',                    en: '/ night'                     },
  };

  const isEmpty = !room && !state.checkIn;

  return (
    <aside className="bg-hotel-surface border border-hotel-border rounded-sm p-6 lg:p-7">
      <h3 className="font-playfair text-lg text-hotel-text mb-5 pb-5 border-b border-hotel-border">
        {L.title[lang]}
      </h3>

      {isEmpty ? (
        <p className="font-inter text-sm text-hotel-text-tertiary leading-relaxed">
          {L.empty[lang]}
        </p>
      ) : (
        <div className="space-y-5">
          {/* Fechas y huéspedes */}
          {state.checkIn && state.checkOut && (
            <div className="flex items-start gap-3">
              <CalendarDays size={15} strokeWidth={1.5} className="text-hotel-gold mt-0.5 shrink-0" />
              <div>
                <p className="font-inter text-sm font-medium text-hotel-text">{dateStr}</p>
                <p className="font-inter text-xs text-hotel-text-tertiary mt-0.5">
                  {L.nights[lang](nights)} &middot; {state.adults + state.children} {L.guests[lang]}{state.adults + state.children !== 1 ? (lang === 'es' ? 'es' : 's') : ''}
                </p>
              </div>
            </div>
          )}

          {/* Habitación */}
          {room && (
            <div className="pt-4 border-t border-hotel-border">
              <p className="text-pretitle text-[10px] mb-2">{L.room[lang]}</p>
              <div className="flex items-start gap-3">
                <BedDouble size={15} strokeWidth={1.5} className="text-hotel-gold mt-0.5 shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-inter text-sm font-medium text-hotel-text leading-snug">
                    {lang === 'es'
                      ? room.slug === 'patio' ? 'Habitación Patio' : room.slug === 'balcon' ? 'Habitación Balcón' : 'Suite Mirador'
                      : room.slug === 'patio' ? 'Patio Room' : room.slug === 'balcon' ? 'Balcony Room' : 'Mirador Suite'
                    }
                  </p>
                  <div className="flex items-center justify-between mt-1.5">
                    <span className="font-inter text-xs text-hotel-text-tertiary">
                      {fmt(roomNightPrice)} {L.perNight[lang]}
                    </span>
                    {nights > 0 && (
                      <span className="font-cormorant text-[1rem] text-hotel-text font-light">
                        {fmt(roomTotal)}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Extras */}
          {selectedExtras.length > 0 && (
            <div className="pt-4 border-t border-hotel-border">
              <p className="text-pretitle text-[10px] mb-3">{L.extras[lang]}</p>
              <div className="space-y-2">
                {selectedExtras.map((extra) => {
                  const price = locale === 'en'
                    ? calcExtraPriceUSD(extra, state.adults, nights)
                    : calcExtraPrice(extra, state.adults, nights);
                  return (
                    <div key={extra.id} className="flex items-start gap-2">
                      <Sparkles size={12} strokeWidth={1.5} className="text-hotel-gold mt-0.5 shrink-0" />
                      <div className="flex-1 flex items-start justify-between gap-2">
                        <p className="font-inter text-xs text-hotel-text-secondary leading-snug">
                          {extra.label[lang]}
                        </p>
                        <span className="font-inter text-xs text-hotel-text shrink-0">
                          {fmt(price)}
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Total */}
          {room && nights > 0 && (
            <div className="pt-4 border-t border-hotel-border">
              <div className="flex items-end justify-between">
                <div>
                  <p className="text-pretitle text-[10px]">{L.subtotal[lang]}</p>
                  <p className="font-inter text-[10px] text-hotel-text-tertiary mt-0.5">{L.taxes[lang]}</p>
                </div>
                <p className="font-cormorant text-2xl text-hotel-primary font-light leading-none">
                  {fmt(grandTotal)}
                </p>
              </div>
            </div>
          )}
        </div>
      )}
    </aside>
  );
}
