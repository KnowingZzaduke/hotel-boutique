'use client';

import { useState } from 'react';
import { useLocale } from 'next-intl';
import { Check } from 'lucide-react';
import { EXTRAS, calcExtraPrice, calcExtraPriceUSD } from '@/lib/extras-data';
import { formatPriceCOP } from '@/lib/rooms-data';
import type { BookingState } from '@/types/reservation';
import { cn } from '@/lib/utils';

interface Props {
  state: BookingState;
  nights: number;
  onNext: (updates: Partial<BookingState>) => void;
  onBack: () => void;
}

export function StepExtras({ state, nights, onNext, onBack }: Props) {
  const locale = useLocale();
  const lang   = (locale === 'en' ? 'en' : 'es') as 'en' | 'es';

  const [selected, setSelected] = useState<string[]>(state.extras);

  const toggle = (id: string) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]
    );

  const fmtExtra = (extra: (typeof EXTRAS)[0]): string => {
    if (locale === 'en') {
      return `+$${calcExtraPriceUSD(extra, state.adults, nights)} USD`;
    }
    return `+${formatPriceCOP(calcExtraPrice(extra, state.adults, nights))}`;
  };

  const L = {
    title:    { es: 'Extras y experiencias', en: 'Extras & experiences'                     },
    subtitle: { es: 'Todos opcionales. Personaliza tu estancia.',  en: 'All optional. Personalize your stay.' },
    back:     { es: 'Volver',               en: 'Back'                                      },
    continue: { es: 'Continuar',            en: 'Continue'                                  },
    skip:     { es: 'Continuar sin extras', en: 'Continue without extras'                  },
  };

  return (
    <div>
      <div className="mb-8">
        <h2 className="font-playfair text-2xl text-hotel-text">{L.title[lang]}</h2>
        <p className="font-inter text-sm text-hotel-text-secondary mt-1">{L.subtitle[lang]}</p>
      </div>

      <div className="grid sm:grid-cols-2 gap-3 mb-8">
        {EXTRAS.map((extra) => {
          const on = selected.includes(extra.id);
          return (
            <button
              key={extra.id}
              onClick={() => toggle(extra.id)}
              aria-pressed={on}
              className={cn(
                'text-left p-5 border rounded-sm transition-all duration-250 group',
                on
                  ? 'border-hotel-primary bg-hotel-primary/5 shadow-hotel'
                  : 'border-hotel-border bg-hotel-surface hover:border-hotel-gold hover:shadow-hotel'
              )}
            >
              <div className="flex items-start justify-between gap-3 mb-2">
                <h3 className="font-playfair text-[0.95rem] font-semibold text-hotel-text leading-snug">
                  {extra.label[lang]}
                </h3>
                <div className={cn(
                  'w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all',
                  on ? 'bg-hotel-primary border-hotel-primary' : 'border-hotel-border'
                )}>
                  {on && <Check size={10} strokeWidth={3} className="text-white" />}
                </div>
              </div>

              <p className="font-inter text-xs text-hotel-text-secondary leading-relaxed mb-3">
                {extra.desc[lang]}
              </p>

              <div className="flex items-center justify-between gap-2">
                <span className="font-inter text-[10px] uppercase tracking-wide text-hotel-text-tertiary">
                  {extra.badge[lang]}
                </span>
                <span className={cn(
                  'font-cormorant text-[1.1rem] font-light leading-none',
                  on ? 'text-hotel-primary' : 'text-hotel-text'
                )}>
                  {fmtExtra(extra)}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      <div className="flex gap-3">
        <button onClick={onBack} className="btn-hotel-outline">{L.back[lang]}</button>
        <button onClick={() => onNext({ extras: selected })} className="btn-hotel-primary">
          {selected.length > 0 ? L.continue[lang] : L.skip[lang]}
        </button>
      </div>
    </div>
  );
}
