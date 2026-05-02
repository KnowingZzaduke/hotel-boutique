'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { format, addDays, differenceInCalendarDays } from 'date-fns';
import { CalendarDays } from 'lucide-react';
import type { BookingState } from '@/types/reservation';

interface Props {
  state: BookingState;
  onNext: (updates: Partial<BookingState>) => void;
}

interface CounterProps {
  label: string; sub: string;
  value: number; min: number; max: number;
  onChange: (v: number) => void;
}

function GuestCounter({ label, sub, value, min, max, onChange }: CounterProps) {
  return (
    <div className="flex items-center justify-between py-3.5">
      <div>
        <p className="font-inter text-sm font-medium text-hotel-text">{label}</p>
        <p className="font-inter text-xs text-hotel-text-tertiary">{sub}</p>
      </div>
      <div className="flex items-center gap-3">
        {['−', '+'].map((sym, i) => (
          <button
            key={sym}
            onClick={() => onChange(i === 0 ? Math.max(min, value - 1) : Math.min(max, value + 1))}
            disabled={i === 0 ? value <= min : value >= max}
            aria-label={`${sym} ${label}`}
            className="w-8 h-8 rounded-full border border-hotel-border flex items-center justify-center text-hotel-text-secondary hover:border-hotel-gold hover:text-hotel-primary transition-colors disabled:opacity-30 disabled:cursor-not-allowed text-base font-light"
          >
            {sym}
          </button>
        )).reduce<React.ReactNode[]>((acc, btn, i) => i === 0 ? [btn] : [...acc,
          <span key="val" className="font-inter text-sm font-medium text-hotel-text w-5 text-center">{value}</span>,
          btn,
        ], [])}
      </div>
    </div>
  );
}

export function StepFechas({ state, onNext }: Props) {
  const locale = useLocale();
  const lang = (locale === 'en' ? 'en' : 'es') as 'en' | 'es';

  const [checkIn, setCheckIn]   = useState<Date | null>(state.checkIn);
  const [checkOut, setCheckOut] = useState<Date | null>(state.checkOut);
  const [adults, setAdults]     = useState(state.adults);
  const [children, setChildren] = useState(state.children);

  const today    = new Date();
  const todayStr = format(today, 'yyyy-MM-dd');
  const minOut   = checkIn ? format(addDays(checkIn, 1), 'yyyy-MM-dd') : todayStr;
  const nights   = checkIn && checkOut ? differenceInCalendarDays(checkOut, checkIn) : 0;
  const canGo    = checkIn && checkOut && nights > 0 && adults >= 1;

  const handleIn = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = e.target.value ? new Date(`${e.target.value}T12:00:00`) : null;
    setCheckIn(d);
    if (d && checkOut && checkOut <= d) setCheckOut(addDays(d, 1));
  };

  const handleOut = (e: React.ChangeEvent<HTMLInputElement>) => {
    const d = e.target.value ? new Date(`${e.target.value}T12:00:00`) : null;
    setCheckOut(d);
  };

  const L = {
    title:    { es: 'Fechas y huéspedes',                      en: 'Dates & guests'                         },
    checkin:  { es: 'Llegada',                                 en: 'Check-in'                               },
    checkout: { es: 'Salida',                                  en: 'Check-out'                              },
    summary:  { es: (n: number) => `${n} noche${n !== 1 ? 's' : ''} seleccionadas`, en: (n: number) => `${n} night${n !== 1 ? 's' : ''} selected` },
    adults:   { es: 'Adultos',                                 en: 'Adults'                                 },
    adultsub: { es: 'Mayores de 12 años',                      en: 'Ages 12+'                               },
    childn:   { es: 'Niños',                                   en: 'Children'                               },
    childsub: { es: 'Menores de 12 años',                      en: 'Under 12'                               },
    btn:      { es: canGo ? 'Continuar' : 'Selecciona las fechas', en: canGo ? 'Continue' : 'Select dates' },
  };

  const inputWrap = 'flex items-center gap-2 border border-hotel-border rounded-sm px-4 py-3 focus-within:border-hotel-gold transition-colors bg-hotel-surface';
  const inputCls  = 'flex-1 bg-transparent font-inter text-sm text-hotel-text focus:outline-none cursor-pointer min-w-0';

  return (
    <div className="bg-hotel-surface shadow-hotel p-8 lg:p-10">
      <h2 className="font-playfair text-2xl text-hotel-text mb-8">{L.title[lang]}</h2>

      <div className="grid sm:grid-cols-2 gap-4 mb-6">
        <div>
          <label className="text-pretitle mb-2 block">{L.checkin[lang]}</label>
          <div className={inputWrap}>
            <CalendarDays size={16} strokeWidth={1.5} className="text-hotel-gold shrink-0" />
            <input type="date" min={todayStr} value={checkIn ? format(checkIn, 'yyyy-MM-dd') : ''} onChange={handleIn} className={inputCls} />
          </div>
        </div>
        <div>
          <label className="text-pretitle mb-2 block">{L.checkout[lang]}</label>
          <div className={inputWrap}>
            <CalendarDays size={16} strokeWidth={1.5} className="text-hotel-gold shrink-0" />
            <input type="date" min={minOut} value={checkOut ? format(checkOut, 'yyyy-MM-dd') : ''} onChange={handleOut} className={inputCls} />
          </div>
        </div>
      </div>

      {nights > 0 && (
        <div className="flex items-center gap-2 bg-hotel-surface-alt px-5 py-3 rounded-sm mb-6">
          <CalendarDays size={15} className="text-hotel-gold" />
          <span className="font-inter text-sm text-hotel-text-secondary">{L.summary[lang](nights)}</span>
        </div>
      )}

      <div className="border border-hotel-border rounded-sm px-5 divide-y divide-hotel-border mb-8">
        <GuestCounter label={L.adults[lang]} sub={L.adultsub[lang]} value={adults} min={1} max={6} onChange={setAdults} />
        <GuestCounter label={L.childn[lang]} sub={L.childsub[lang]} value={children} min={0} max={4} onChange={setChildren} />
      </div>

      <button
        onClick={() => canGo && onNext({ checkIn, checkOut, adults, children })}
        disabled={!canGo}
        className="btn-hotel-primary disabled:opacity-40 disabled:cursor-not-allowed"
      >
        {L.btn[lang]}
      </button>
    </div>
  );
}
