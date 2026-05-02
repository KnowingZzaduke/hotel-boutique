'use client';

import { useReducer, useCallback } from 'react';
import { useLocale } from 'next-intl';
import { differenceInCalendarDays } from 'date-fns';
import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { BookingState } from '@/types/reservation';
import { StepFechas }       from './step-fechas';
import { StepHabitacion }   from './step-habitacion';
import { StepExtras }       from './step-extras';
import { StepDatos }        from './step-datos';
import { StepConfirmacion } from './step-confirmacion';
import { BookingSummary }   from './booking-summary';

const INITIAL: BookingState = {
  step:             1,
  checkIn:          null,
  checkOut:         null,
  adults:           2,
  children:         0,
  roomSlug:         null,
  extras:           [],
  guestData:        null,
  confirmationCode: null,
};

function generateCode(): string {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  const part   = Array.from({ length: 4 }, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  return `CSD-2026-${part}`;
}

type Action =
  | { type: 'NEXT'; payload: Partial<BookingState> }
  | { type: 'BACK' }
  | { type: 'RESET' }
  | { type: 'CONFIRM'; payload: Partial<BookingState> };

function reducer(state: BookingState, action: Action): BookingState {
  switch (action.type) {
    case 'NEXT':
      return { ...state, ...action.payload, step: (state.step + 1) as BookingState['step'] };
    case 'BACK':
      return { ...state, step: (state.step - 1) as BookingState['step'] };
    case 'CONFIRM':
      return {
        ...state,
        ...action.payload,
        step: 5,
        confirmationCode: generateCode(),
      };
    case 'RESET':
      return { ...INITIAL };
    default:
      return state;
  }
}

const STEP_LABELS = {
  es: ['Fechas', 'Habitación', 'Extras', 'Datos', 'Confirmación'],
  en: ['Dates',  'Room',       'Extras', 'Details', 'Confirmation'],
};

interface StepDotProps {
  index: number;
  current: number;
  label: string;
}

function StepDot({ index, current, label }: StepDotProps) {
  const step     = index + 1;
  const done     = step < current;
  const active   = step === current;
  const isLast   = index === 4;

  return (
    <li className="flex items-center gap-0">
      <div className="flex flex-col items-center gap-1.5">
        <div
          aria-current={active ? 'step' : undefined}
          className={cn(
            'w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 text-xs font-medium font-inter shrink-0',
            done   && 'bg-hotel-botanical text-white',
            active && 'bg-hotel-primary text-white ring-4 ring-hotel-primary/20',
            !done && !active && 'bg-hotel-surface border border-hotel-border text-hotel-text-tertiary'
          )}
        >
          {done ? <Check size={14} strokeWidth={2.5} /> : step}
        </div>
        <span className={cn(
          'font-inter text-[10px] tracking-wide uppercase hidden sm:block transition-colors',
          active  ? 'text-hotel-primary font-medium' : 'text-hotel-text-tertiary'
        )}>
          {label}
        </span>
      </div>
      {!isLast && (
        <div className={cn(
          'h-px flex-1 mx-2 sm:mx-3 transition-colors duration-500 mb-5',
          done ? 'bg-hotel-botanical' : 'bg-hotel-border'
        )} />
      )}
    </li>
  );
}

export function BookingWizard() {
  const [state, dispatch] = useReducer(reducer, INITIAL);
  const locale = useLocale();
  const lang   = (locale === 'en' ? 'en' : 'es') as 'en' | 'es';

  const nights = state.checkIn && state.checkOut
    ? differenceInCalendarDays(state.checkOut, state.checkIn)
    : 0;

  const handleNext    = useCallback((payload: Partial<BookingState>) => dispatch({ type: 'NEXT', payload }), []);
  const handleBack    = useCallback(() => dispatch({ type: 'BACK' }), []);
  const handleConfirm = useCallback((payload: Partial<BookingState>) => dispatch({ type: 'CONFIRM', payload }), []);
  const handleReset   = useCallback(() => dispatch({ type: 'RESET' }), []);

  const labels = STEP_LABELS[lang];
  const isConfirmed = state.step === 5;

  return (
    <div>
      {/* Step progress */}
      {!isConfirmed && (
        <nav aria-label={lang === 'es' ? 'Pasos de la reserva' : 'Booking steps'} className="mb-10 lg:mb-12">
          <ol className="flex items-start">
            {labels.map((label, i) => (
              <StepDot key={label} index={i} current={state.step} label={label} />
            ))}
          </ol>
        </nav>
      )}

      {isConfirmed ? (
        /* Confirmation — full width */
        <StepConfirmacion state={state} onReset={handleReset} />
      ) : (
        /* Wizard layout — main + sidebar */
        <div className="grid lg:grid-cols-[1fr_340px] gap-8 lg:gap-12 items-start">
          <div>
            {state.step === 1 && (
              <StepFechas state={state} onNext={handleNext} />
            )}
            {state.step === 2 && (
              <StepHabitacion
                state={state}
                nights={nights}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {state.step === 3 && (
              <StepExtras
                state={state}
                nights={nights}
                onNext={handleNext}
                onBack={handleBack}
              />
            )}
            {state.step === 4 && (
              <StepDatos
                state={state}
                onConfirm={handleConfirm}
                onBack={handleBack}
              />
            )}
          </div>

          {/* Summary sidebar — sticky on desktop */}
          <div className="lg:sticky lg:top-32">
            <BookingSummary state={state} />
          </div>
        </div>
      )}
    </div>
  );
}
