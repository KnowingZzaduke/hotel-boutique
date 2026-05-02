'use client';

import { useLocale } from 'next-intl';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import type { BookingState, GuestData } from '@/types/reservation';
import { cn } from '@/lib/utils';

interface Props {
  state: BookingState;
  onConfirm: (updates: Partial<BookingState>) => void;
  onBack: () => void;
}

const schema = z.object({
  firstName: z.string().min(2),
  lastName:  z.string().min(2),
  email:     z.string().email(),
  phone:     z.string().min(7),
  country:   z.string().min(2),
  requests:  z.string(),
});

type FormValues = z.infer<typeof schema>;

const COUNTRIES = {
  es: ['Colombia', 'Estados Unidos', 'México', 'Argentina', 'España', 'Brasil', 'Perú', 'Chile', 'Venezuela', 'Ecuador', 'Panamá', 'Costa Rica', 'Francia', 'Alemania', 'Reino Unido', 'Italia', 'Canadá', 'Otro'],
  en: ['Colombia', 'United States', 'Mexico', 'Argentina', 'Spain', 'Brazil', 'Peru', 'Chile', 'Venezuela', 'Ecuador', 'Panama', 'Costa Rica', 'France', 'Germany', 'United Kingdom', 'Italy', 'Canada', 'Other'],
};

const base = 'w-full font-inter text-sm text-hotel-text bg-hotel-surface border rounded-sm px-4 py-3 focus:outline-none transition-colors placeholder:text-hotel-text-tertiary';

function Field({ label, error, children }: { label: string; error?: string; children: React.ReactNode }) {
  return (
    <div>
      <label className="text-pretitle mb-1.5 block">{label}</label>
      {children}
      {error && <p className="font-inter text-xs text-red-500 mt-1">{error}</p>}
    </div>
  );
}

export function StepDatos({ state, onConfirm, onBack }: Props) {
  const locale = useLocale();
  const lang   = (locale === 'en' ? 'en' : 'es') as 'en' | 'es';

  const { register, handleSubmit, formState: { errors } } = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: state.guestData ?? { firstName: '', lastName: '', email: '', phone: '', country: '', requests: '' },
  });

  const L = {
    title:     { es: 'Tus datos',                   en: 'Your details'                    },
    firstName: { es: 'Nombre',                       en: 'First name'                      },
    lastName:  { es: 'Apellido',                     en: 'Last name'                       },
    email:     { es: 'Correo electrónico',            en: 'Email address'                   },
    phone:     { es: 'Teléfono',                     en: 'Phone number'                    },
    country:   { es: 'País de residencia',            en: 'Country of residence'            },
    selCountry:{ es: 'Selecciona un país...',         en: 'Select a country...'             },
    requests:  { es: 'Peticiones especiales',         en: 'Special requests'                },
    reqPH:     { es: 'Alergias, celebración especial, preferencias de cama...', en: 'Allergies, special celebration, bed preferences...' },
    back:      { es: 'Volver',                       en: 'Back'                            },
    confirm:   { es: 'Confirmar reserva',             en: 'Confirm booking'                 },
    err: {
      min2:    { es: 'Mínimo 2 caracteres',           en: 'Minimum 2 characters'           },
      email:   { es: 'Email inválido',                en: 'Invalid email'                  },
      phone:   { es: 'Teléfono inválido',             en: 'Invalid phone'                  },
      req:     { es: 'Campo requerido',               en: 'Required field'                 },
    },
  };

  const errMsg = (field: keyof typeof errors): string | undefined => {
    const e = errors[field];
    if (!e) return undefined;
    if (e.type === 'too_small')     return L.err.min2[lang];
    if (e.type === 'invalid_string' && field === 'email') return L.err.email[lang];
    if (e.type === 'invalid_string' && field === 'phone') return L.err.phone[lang];
    return L.err.req[lang];
  };

  const borderCls = (field: keyof typeof errors) =>
    cn(base, errors[field] ? 'border-red-400 focus:border-red-400' : 'border-hotel-border focus:border-hotel-gold');

  const onSubmit = (data: FormValues) => onConfirm({ guestData: data as GuestData });

  return (
    <div className="bg-hotel-surface shadow-hotel p-8 lg:p-10">
      <h2 className="font-playfair text-2xl text-hotel-text mb-8">{L.title[lang]}</h2>

      <form onSubmit={handleSubmit(onSubmit)} noValidate className="space-y-5">
        <div className="grid sm:grid-cols-2 gap-5">
          <Field label={L.firstName[lang]} error={errMsg('firstName')}>
            <input {...register('firstName')} className={borderCls('firstName')} placeholder="María" />
          </Field>
          <Field label={L.lastName[lang]} error={errMsg('lastName')}>
            <input {...register('lastName')} className={borderCls('lastName')} placeholder="García" />
          </Field>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          <Field label={L.email[lang]} error={errMsg('email')}>
            <input {...register('email')} type="email" className={borderCls('email')} placeholder="maria@email.com" />
          </Field>
          <Field label={L.phone[lang]} error={errMsg('phone')}>
            <input {...register('phone')} type="tel" className={borderCls('phone')} placeholder="+57 300 000 0000" />
          </Field>
        </div>

        <Field label={L.country[lang]} error={errMsg('country')}>
          <select {...register('country')} className={borderCls('country')}>
            <option value="">{L.selCountry[lang]}</option>
            {COUNTRIES[lang].map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </Field>

        <Field label={L.requests[lang]}>
          <textarea
            {...register('requests')}
            rows={3}
            className={cn(base, 'border-hotel-border focus:border-hotel-gold resize-none')}
            placeholder={L.reqPH[lang]}
          />
        </Field>

        <div className="flex gap-3 pt-2">
          <button type="button" onClick={onBack} className="btn-hotel-outline">{L.back[lang]}</button>
          <button type="submit" className="btn-hotel-primary">{L.confirm[lang]}</button>
        </div>
      </form>
    </div>
  );
}
