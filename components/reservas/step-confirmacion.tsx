'use client';

import { useState, useEffect, useRef } from 'react';
import { useLocale } from 'next-intl';
import { differenceInCalendarDays, format } from 'date-fns';
import { CheckCircle, CalendarDays, BedDouble, Users, MessageCircle, Phone, Download, Mail, Loader2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { toast } from 'sonner';
import { ROOMS, formatPriceCOP } from '@/lib/rooms-data';
import { EXTRAS, calcExtraPrice, calcExtraPriceUSD } from '@/lib/extras-data';
import { generateBookingPDF } from '@/lib/pdf-generator';
import type { BookingState, BookingPayload } from '@/types/reservation';

interface Props {
  state: BookingState;
  onReset: () => void;
}

const ROOM_NAMES: Record<string, { es: string; en: string }> = {
  patio:   { es: 'Habitación Patio',  en: 'Patio Room'    },
  balcon:  { es: 'Habitación Balcón', en: 'Balcony Room'  },
  mirador: { es: 'Suite Mirador',     en: 'Mirador Suite' },
};

export function StepConfirmacion({ state, onReset }: Props) {
  const locale = useLocale();
  const lang   = (locale === 'en' ? 'en' : 'es') as 'en' | 'es';

  const [emailStatus, setEmailStatus] = useState<'sending' | 'sent' | 'error'>('sending');
  const [pdfLoading, setPdfLoading]   = useState(false);
  const emailCalled = useRef(false);

  const nights = state.checkIn && state.checkOut
    ? differenceInCalendarDays(state.checkOut, state.checkIn)
    : 0;

  const room            = ROOMS.find((r) => r.slug === state.roomSlug);
  const roomNightPrice  = room ? (locale === 'en' ? room.priceUSD : room.priceCOP) : 0;
  const roomTotal       = roomNightPrice * Math.max(nights, 1);
  const selectedExtras  = EXTRAS.filter((e) => state.extras.includes(e.id));
  const extrasTotal     = selectedExtras.reduce(
    (acc, e) => acc + (locale === 'en' ? calcExtraPriceUSD(e, state.adults, nights) : calcExtraPrice(e, state.adults, nights)),
    0
  );
  const grandTotal = roomTotal + extrasTotal;

  const grandTotalCOP = (() => {
    const r = ROOMS.find((x) => x.slug === state.roomSlug);
    if (!r) return 0;
    const base = r.priceCOP * Math.max(nights, 1);
    const ex = selectedExtras.reduce((acc, e) => acc + calcExtraPrice(e, state.adults, nights), 0);
    return base + ex;
  })();
  const grandTotalUSD = (() => {
    const r = ROOMS.find((x) => x.slug === state.roomSlug);
    if (!r) return 0;
    const base = r.priceUSD * Math.max(nights, 1);
    const ex = selectedExtras.reduce((acc, e) => acc + calcExtraPriceUSD(e, state.adults, nights), 0);
    return base + ex;
  })();

  const fmt = (n: number) =>
    locale === 'en' ? `$${n.toLocaleString('en-US')} USD` : formatPriceCOP(n);

  const code = state.confirmationCode ?? 'CSD-2026-????';

  /* ── Send email on mount (once) ─────────────────────────── */
  useEffect(() => {
    if (emailCalled.current || !state.guestData || !room || !state.checkIn || !state.checkOut) return;
    emailCalled.current = true;

    const payload: BookingPayload = {
      code,
      locale: lang,
      checkIn:  format(state.checkIn, 'dd/MM/yyyy'),
      checkOut: format(state.checkOut, 'dd/MM/yyyy'),
      nights,
      adults:   state.adults,
      children: state.children,
      roomSlug: state.roomSlug!,
      extras:   state.extras,
      grandTotalCOP,
      grandTotalUSD,
      guest: state.guestData,
    };

    fetch('/api/booking/confirm', {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    })
      .then((r) => r.json())
      .then((data: { ok?: boolean; error?: string }) => {
        if (data.ok) {
          setEmailStatus('sent');
          toast.success(lang === 'es' ? 'Confirmación enviada a tu email' : 'Confirmation sent to your email');
        } else {
          setEmailStatus('error');
        }
      })
      .catch(() => setEmailStatus('error'));
  }, []);  // eslint-disable-line react-hooks/exhaustive-deps

  /* ── PDF download ─────────────────────────────────────────── */
  async function handleDownloadPDF() {
    if (!state.guestData || !room || !state.checkIn || !state.checkOut) return;
    setPdfLoading(true);
    try {
      await generateBookingPDF({
        code,
        locale: lang,
        checkIn:  format(state.checkIn, 'dd/MM/yyyy'),
        checkOut: format(state.checkOut, 'dd/MM/yyyy'),
        nights,
        adults:   state.adults,
        children: state.children,
        roomSlug: state.roomSlug!,
        extras:   state.extras,
        grandTotalCOP,
        grandTotalUSD,
        guest: state.guestData,
      });
    } catch {
      toast.error(lang === 'es' ? 'Error al generar el PDF' : 'PDF generation failed');
    } finally {
      setPdfLoading(false);
    }
  }

  const waMsg = encodeURIComponent(
    lang === 'es'
      ? `Hola, mi código de pre-reserva es *${code}*. Me gustaría confirmarla.`
      : `Hello, my pre-booking code is *${code}*. I'd like to confirm it.`
  );

  const L = {
    badge:     { es: 'Pre-reserva recibida',           en: 'Pre-booking received'        },
    title:     { es: '¡Reserva solicitada con éxito!', en: 'Booking request received!'   },
    subtitle:  { es: 'Nuestro equipo te contactará en menos de 2 horas para confirmar tu estancia y procesar el pago.', en: 'Our team will contact you within 2 hours to confirm your stay and process payment.' },
    codeLabel: { es: 'Tu código de reserva',           en: 'Your booking code'           },
    detail:    { es: 'Detalle de la estancia',          en: 'Stay details'               },
    room:      { es: 'Habitación',                     en: 'Room'                        },
    nights:    { es: (n: number) => `${n} noche${n !== 1 ? 's' : ''}`, en: (n: number) => `${n} night${n !== 1 ? 's' : ''}` },
    guests:    { es: (n: number) => `${n} huésped${n !== 1 ? 'es' : ''}`, en: (n: number) => `${n} guest${n !== 1 ? 's' : ''}` },
    extras:    { es: 'Extras incluidos',               en: 'Extras included'             },
    total:     { es: 'Total estimado',                 en: 'Estimated total'             },
    taxes:     { es: 'Impuestos incluidos',             en: 'Taxes included'             },
    email:     {
      sending: { es: 'Enviando confirmación a tu correo…', en: 'Sending confirmation to your email…' },
      sent:    { es: 'Confirmación enviada a tu correo',   en: 'Confirmation sent to your email'     },
      error:   { es: 'Email no disponible. Guarda tu código.', en: 'Email unavailable. Save your code.' },
    },
    cta1:     { es: 'Confirmar por WhatsApp',         en: 'Confirm via WhatsApp'         },
    cta2:     { es: 'Llamar ahora',                   en: 'Call now'                     },
    pdf:      { es: 'Descargar reserva PDF',           en: 'Download booking PDF'         },
    newBook:  { es: 'Nueva reserva',                  en: 'New booking'                  },
  };

  const emailColors = { sending: 'text-hotel-text-secondary', sent: 'text-hotel-botanical', error: 'text-amber-600' };

  return (
    <div className="max-w-2xl mx-auto">
      {/* Header */}
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }} className="text-center mb-10">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ delay: 0.2, type: 'spring', stiffness: 260, damping: 20 }} className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-hotel-botanical/10 mb-6">
          <CheckCircle size={40} strokeWidth={1.5} className="text-hotel-botanical" />
        </motion.div>
        <p className="text-pretitle mb-3">{L.badge[lang]}</p>
        <h2 className="font-playfair text-3xl lg:text-4xl text-hotel-text mb-4 text-balance">{L.title[lang]}</h2>
        <p className="font-inter text-sm text-hotel-text-secondary leading-relaxed max-w-md mx-auto">{L.subtitle[lang]}</p>
        {/* Email status */}
        <div className={`mt-4 flex items-center justify-center gap-1.5 font-inter text-xs ${emailColors[emailStatus]}`}>
          {emailStatus === 'sending' && <Loader2 size={12} className="animate-spin" />}
          {emailStatus === 'sent'    && <Mail size={12} />}
          <span>{L.email[emailStatus][lang]}</span>
        </div>
      </motion.div>

      {/* Code */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35, duration: 0.5 }} className="bg-hotel-surface-alt border border-hotel-border rounded-sm p-6 text-center mb-6">
        <p className="text-pretitle mb-2">{L.codeLabel[lang]}</p>
        <p className="font-cormorant text-4xl font-light tracking-[0.15em] text-hotel-primary">{code}</p>
      </motion.div>

      {/* Stay details */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.45, duration: 0.5 }} className="bg-hotel-surface border border-hotel-border rounded-sm p-6 mb-6 space-y-4">
        <h3 className="font-playfair text-base text-hotel-text pb-4 border-b border-hotel-border">{L.detail[lang]}</h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {state.checkIn && state.checkOut && (
            <div className="flex items-start gap-3">
              <CalendarDays size={15} strokeWidth={1.5} className="text-hotel-gold mt-0.5 shrink-0" />
              <div>
                <p className="font-inter text-xs text-hotel-text-tertiary uppercase tracking-wide mb-0.5">{lang === 'es' ? 'Fechas' : 'Dates'}</p>
                <p className="font-inter text-sm text-hotel-text">{format(state.checkIn, 'MMM d')} – {format(state.checkOut, 'MMM d, yyyy')}</p>
                <p className="font-inter text-xs text-hotel-text-secondary mt-0.5">{L.nights[lang](nights)}</p>
              </div>
            </div>
          )}
          <div className="flex items-start gap-3">
            <Users size={15} strokeWidth={1.5} className="text-hotel-gold mt-0.5 shrink-0" />
            <div>
              <p className="font-inter text-xs text-hotel-text-tertiary uppercase tracking-wide mb-0.5">{lang === 'es' ? 'Huéspedes' : 'Guests'}</p>
              <p className="font-inter text-sm text-hotel-text">{L.guests[lang](state.adults + state.children)}</p>
              {state.guestData && <p className="font-inter text-xs text-hotel-text-secondary mt-0.5">{state.guestData.firstName} {state.guestData.lastName}</p>}
            </div>
          </div>
          {room && (
            <div className="flex items-start gap-3">
              <BedDouble size={15} strokeWidth={1.5} className="text-hotel-gold mt-0.5 shrink-0" />
              <div>
                <p className="font-inter text-xs text-hotel-text-tertiary uppercase tracking-wide mb-0.5">{L.room[lang]}</p>
                <p className="font-inter text-sm text-hotel-text">{ROOM_NAMES[room.slug]?.[lang] ?? room.slug}</p>
                <p className="font-inter text-xs text-hotel-text-secondary mt-0.5">{fmt(roomNightPrice)} / {lang === 'es' ? 'noche' : 'night'}</p>
              </div>
            </div>
          )}
        </div>

        {selectedExtras.length > 0 && (
          <div className="pt-4 border-t border-hotel-border">
            <p className="font-inter text-xs text-hotel-text-tertiary uppercase tracking-wide mb-3">{L.extras[lang]}</p>
            <div className="space-y-1.5">
              {selectedExtras.map((extra) => (
                <div key={extra.id} className="flex items-center justify-between gap-3">
                  <p className="font-inter text-sm text-hotel-text-secondary">{extra.label[lang]}</p>
                  <span className="font-inter text-sm text-hotel-text">{fmt(locale === 'en' ? calcExtraPriceUSD(extra, state.adults, nights) : calcExtraPrice(extra, state.adults, nights))}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="flex items-end justify-between pt-4 border-t border-hotel-border">
          <div>
            <p className="text-pretitle text-[10px]">{L.total[lang]}</p>
            <p className="font-inter text-[10px] text-hotel-text-tertiary mt-0.5">{L.taxes[lang]}</p>
          </div>
          <p className="font-cormorant text-3xl text-hotel-primary font-light leading-none">{fmt(grandTotal)}</p>
        </div>
      </motion.div>

      {/* CTAs */}
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.55, duration: 0.5 }} className="flex flex-col sm:flex-row gap-3">
        <a href={`https://wa.me/573052345678?text=${waMsg}`} target="_blank" rel="noopener noreferrer" className="btn-hotel-primary flex-1 justify-center gap-2">
          <MessageCircle size={16} strokeWidth={1.5} />
          {L.cta1[lang]}
        </a>
        <a href="tel:+573052345678" className="btn-hotel-outline flex-1 justify-center gap-2">
          <Phone size={16} strokeWidth={1.5} />
          {L.cta2[lang]}
        </a>
      </motion.div>

      {/* PDF Download */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7, duration: 0.4 }} className="mt-4">
        <button
          onClick={handleDownloadPDF}
          disabled={pdfLoading}
          className="w-full flex items-center justify-center gap-2 py-3 border border-hotel-border rounded-sm font-inter text-sm text-hotel-text-secondary hover:border-hotel-gold hover:text-hotel-primary transition-colors disabled:opacity-50 disabled:cursor-wait"
        >
          {pdfLoading ? <Loader2 size={15} className="animate-spin" /> : <Download size={15} strokeWidth={1.5} />}
          {L.pdf[lang]}
        </button>
      </motion.div>

      <div className="text-center mt-8">
        <button onClick={onReset} className="btn-hotel-ghost text-xs">{L.newBook[lang]}</button>
      </div>
    </div>
  );
}
