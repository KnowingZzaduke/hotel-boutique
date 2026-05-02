import { ROOMS, formatPriceCOP } from './rooms-data';
import { EXTRAS, calcExtraPrice, calcExtraPriceUSD } from './extras-data';
import type { BookingPayload } from '@/types/reservation';

const ROOM_NAMES: Record<string, { es: string; en: string }> = {
  patio:   { es: 'Habitación Patio',  en: 'Patio Room'    },
  balcon:  { es: 'Habitación Balcón', en: 'Balcony Room'  },
  mirador: { es: 'Suite Mirador',     en: 'Mirador Suite' },
};

/* ── Colors ─────────────────────────────────────── */
const C = {
  primary:   [139, 111,  71] as const, // #8B6F47
  gold:      [201, 168, 107] as const, // #C9A86B
  deep:      [ 74,  56,  41] as const, // #4A3829
  surfAlt:   [245, 237, 224] as const, // #F5EDE0
  text:      [ 42,  38,  32] as const, // #2A2620
  secondary: [107,  98,  89] as const, // #6B6259
  tertiary:  [154, 144, 136] as const, // #9A9088
  white:     [255, 255, 255] as const,
};

export async function generateBookingPDF(p: BookingPayload): Promise<void> {
  const { jsPDF } = await import('jspdf');
  const doc   = new jsPDF({ unit: 'mm', format: 'a4' });
  const lang  = p.locale;
  const W     = 210;
  const M     = 20; // margin
  const CW    = W - M * 2; // content width

  const fmt = (n: number) =>
    lang === 'en' ? `$${n.toLocaleString('en-US')} USD` : formatPriceCOP(n);

  let y = 0;

  /* ── Header band ─────────────────────────────── */
  doc.setFillColor(...C.deep);
  doc.rect(0, 0, W, 48, 'F');

  doc.setFont('times', 'italic');
  doc.setFontSize(8);
  doc.setTextColor(...C.gold);
  doc.text('CARTAGENA DE INDIAS · COLOMBIA', W / 2, 14, { align: 'center' });

  doc.setFont('times', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(...C.white);
  doc.text('CASA BOUTIQUE SAN DIEGO', W / 2, 24, { align: 'center' });

  doc.setFont('times', 'italic');
  doc.setFontSize(10);
  doc.setTextColor(220, 208, 190);
  doc.text(
    lang === 'es' ? 'Una casa colonial. Una experiencia inolvidable.' : 'A colonial house. An unforgettable experience.',
    W / 2, 33, { align: 'center' }
  );

  /* Gold rule */
  doc.setDrawColor(...C.gold);
  doc.setLineWidth(0.4);
  doc.line(M, 40, W - M, 40);

  y = 40;

  /* ── Booking code block ──────────────────────── */
  doc.setFillColor(...C.surfAlt);
  doc.rect(0, y, W, 28, 'F');

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...C.tertiary);
  doc.text(
    lang === 'es' ? 'CÓDIGO DE PRE-RESERVA' : 'PRE-BOOKING CODE',
    W / 2, y + 9, { align: 'center' }
  );

  doc.setFont('times', 'normal');
  doc.setFontSize(28);
  doc.setTextColor(...C.primary);
  doc.text(p.code, W / 2, y + 22, { align: 'center', charSpace: 2 });

  y += 38;

  /* ── Section helper ──────────────────────────── */
  function sectionTitle(title: string) {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(...C.tertiary);
    doc.text(title.toUpperCase(), M, y);
    doc.setDrawColor(...C.gold);
    doc.setLineWidth(0.3);
    doc.line(M, y + 1.5, W - M, y + 1.5);
    y += 7;
  }

  function row(label: string, value: string, bold = false) {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...C.secondary);
    doc.text(label, M, y);

    doc.setFont('helvetica', bold ? 'bold' : 'normal');
    doc.setFontSize(9);
    doc.setTextColor(...C.text);
    doc.text(value, M + 55, y);
    y += 7;
  }

  /* ── Guest info ──────────────────────────────── */
  sectionTitle(lang === 'es' ? 'Huésped' : 'Guest');
  row(lang === 'es' ? 'Nombre' : 'Name', `${p.guest.firstName} ${p.guest.lastName}`);
  row('Email', p.guest.email);
  row(lang === 'es' ? 'Teléfono' : 'Phone', p.guest.phone);
  row(lang === 'es' ? 'País' : 'Country', p.guest.country);
  y += 4;

  /* ── Stay details ────────────────────────────── */
  sectionTitle(lang === 'es' ? 'Detalle de la estancia' : 'Stay details');
  const nightsStr = lang === 'es'
    ? `${p.nights} noche${p.nights !== 1 ? 's' : ''}`
    : `${p.nights} night${p.nights !== 1 ? 's' : ''}`;
  row(lang === 'es' ? 'Llegada' : 'Check-in', p.checkIn);
  row(lang === 'es' ? 'Salida' : 'Check-out', p.checkOut);
  row(lang === 'es' ? 'Duración' : 'Duration', nightsStr);

  const totalGuests = p.adults + p.children;
  const guestsStr = lang === 'es'
    ? `${p.adults} adulto${p.adults !== 1 ? 's' : ''}${p.children > 0 ? ` + ${p.children} niño${p.children !== 1 ? 's' : ''}` : ''}`
    : `${p.adults} adult${p.adults !== 1 ? 's' : ''}${p.children > 0 ? ` + ${p.children} child${totalGuests !== 1 ? 'ren' : ''}` : ''}`;
  row(lang === 'es' ? 'Huéspedes' : 'Guests', guestsStr);

  const roomObj = ROOMS.find((r) => r.slug === p.roomSlug);
  const roomName = ROOM_NAMES[p.roomSlug]?.[lang] ?? p.roomSlug;
  const nightRate = roomObj ? (lang === 'en' ? roomObj.priceUSD : roomObj.priceCOP) : 0;

  row(lang === 'es' ? 'Habitación' : 'Room', roomName);
  row(lang === 'es' ? 'Tarifa/noche' : 'Rate/night', fmt(nightRate));
  row(lang === 'es' ? 'Subtotal alojamiento' : 'Accommodation', fmt(nightRate * p.nights));
  y += 4;

  /* ── Extras ─────────────────────────────────── */
  if (p.extras.length > 0) {
    sectionTitle(lang === 'es' ? 'Extras y experiencias' : 'Extras & experiences');
    p.extras.forEach((id) => {
      const extra = EXTRAS.find((e) => e.id === id);
      if (!extra) return;
      const ep = lang === 'en'
        ? calcExtraPriceUSD(extra, p.adults, p.nights)
        : calcExtraPrice(extra, p.adults, p.nights);
      row(extra.label[lang], fmt(ep));
    });
    y += 4;
  }

  /* ── Special requests ────────────────────────── */
  if (p.guest.requests) {
    sectionTitle(lang === 'es' ? 'Peticiones especiales' : 'Special requests');
    doc.setFont('helvetica', 'italic');
    doc.setFontSize(9);
    doc.setTextColor(...C.secondary);
    const lines = doc.splitTextToSize(p.guest.requests, CW);
    doc.text(lines as string[], M, y);
    y += (lines.length as number) * 5 + 4;
  }

  /* ── Total ───────────────────────────────────── */
  doc.setDrawColor(...C.gold);
  doc.setLineWidth(0.4);
  doc.line(M, y, W - M, y);
  y += 7;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(9);
  doc.setTextColor(...C.tertiary);
  doc.text(lang === 'es' ? 'Total estimado (impuestos incl.)' : 'Estimated total (taxes incl.)', M, y);

  doc.setFont('times', 'normal');
  doc.setFontSize(20);
  doc.setTextColor(...C.primary);
  doc.text(fmt(lang === 'en' ? p.grandTotalUSD : p.grandTotalCOP), W - M, y + 2, { align: 'right' });
  y += 14;

  /* ── Footer ──────────────────────────────────── */
  const footerY = 278;
  doc.setDrawColor(...C.gold);
  doc.setLineWidth(0.3);
  doc.line(M, footerY - 4, W - M, footerY - 4);

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(...C.tertiary);
  doc.text('Calle de las Bóvedas #39-67, Barrio San Diego, Centro Histórico Amurallado, Cartagena de Indias', W / 2, footerY, { align: 'center' });
  doc.text('+57 305 234 5678  ·  reservas@casaboutiquesandiego.com  ·  Recepción 24h', W / 2, footerY + 5, { align: 'center' });

  doc.setFontSize(7);
  doc.setTextColor(...C.tertiary);
  doc.text(`© 2026 Casa Boutique San Diego · casaboutiquesandiego.com`, W / 2, footerY + 11, { align: 'center' });

  doc.save(`reserva-${p.code}.pdf`);
}
