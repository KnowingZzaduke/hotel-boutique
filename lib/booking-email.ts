import type { BookingPayload } from '@/types/reservation';
import { ROOMS, formatPriceCOP } from './rooms-data';
import { EXTRAS, calcExtraPrice, calcExtraPriceUSD } from './extras-data';

const ROOM_NAMES: Record<string, { es: string; en: string }> = {
  patio:   { es: 'Habitación Patio',  en: 'Patio Room'    },
  balcon:  { es: 'Habitación Balcón', en: 'Balcony Room'  },
  mirador: { es: 'Suite Mirador',     en: 'Mirador Suite' },
};

function fmtCOP(n: number) { return formatPriceCOP(n); }
function fmtUSD(n: number) { return `$${n.toLocaleString('en-US')} USD`; }

function detailRow(label: string, value: string): string {
  return `
    <tr>
      <td style="padding:10px 0;border-bottom:1px solid rgba(42,38,32,0.08);color:#6B6259;font-size:12px;font-family:Arial,sans-serif;width:40%;vertical-align:top;">
        ${label}
      </td>
      <td style="padding:10px 0;border-bottom:1px solid rgba(42,38,32,0.08);color:#2A2620;font-size:13px;font-family:Arial,sans-serif;vertical-align:top;font-weight:500;">
        ${value}
      </td>
    </tr>`;
}

export function buildGuestEmail(p: BookingPayload): string {
  const lang  = p.locale;
  const room  = ROOMS.find((r) => r.slug === p.roomSlug);
  const price = lang === 'en' ? room?.priceUSD ?? 0 : room?.priceCOP ?? 0;
  const fmt   = lang === 'en' ? fmtUSD : fmtCOP;

  const extrasHtml = p.extras.length === 0 ? '' : (() => {
    const rows = p.extras.map((id) => {
      const extra = EXTRAS.find((e) => e.id === id);
      if (!extra) return '';
      const ep = lang === 'en'
        ? calcExtraPriceUSD(extra, p.adults, p.nights)
        : calcExtraPrice(extra, p.adults, p.nights);
      return detailRow(extra.label[lang], fmt(ep));
    }).join('');
    return `
      <tr><td colspan="2" style="padding:16px 0 4px;font-size:11px;text-transform:uppercase;letter-spacing:2px;color:#9A9088;font-family:Arial,sans-serif;">
        ${lang === 'es' ? 'Extras' : 'Extras'}
      </td></tr>${rows}`;
  })();

  const L = {
    subject:  lang === 'es' ? '¡Tu pre-reserva fue recibida!' : 'Your pre-booking was received!',
    greeting: lang === 'es' ? `Hola, ${p.guest.firstName}` : `Hello, ${p.guest.firstName}`,
    intro:    lang === 'es'
      ? 'Hemos recibido tu solicitud de reserva en Casa Boutique San Diego. Nuestro equipo te contactará en menos de 2 horas para confirmar tu estancia y procesar el pago.'
      : 'We have received your booking request at Casa Boutique San Diego. Our team will contact you within 2 hours to confirm your stay and process payment.',
    codeLabel: lang === 'es' ? 'TU CÓDIGO DE RESERVA' : 'YOUR BOOKING CODE',
    detailsHd: lang === 'es' ? 'Detalle de tu estancia' : 'Stay details',
    nights:   lang === 'es' ? `${p.nights} noche${p.nights !== 1 ? 's' : ''}` : `${p.nights} night${p.nights !== 1 ? 's' : ''}`,
    guests:   lang === 'es' ? `${p.adults} adulto${p.adults !== 1 ? 's' : ''}${p.children > 0 ? ` + ${p.children} niño${p.children !== 1 ? 's' : ''}` : ''}` : `${p.adults} adult${p.adults !== 1 ? 's' : ''}${p.children > 0 ? ` + ${p.children} child${p.children !== 1 ? 'ren' : ''}` : ''}`,
    dateLabel: lang === 'es' ? 'Fechas' : 'Dates',
    guestLbl:  lang === 'es' ? 'Huéspedes' : 'Guests',
    roomLbl:   lang === 'es' ? 'Habitación' : 'Room',
    rateLbl:   lang === 'es' ? 'Tarifa/noche' : 'Rate/night',
    totalLbl:  lang === 'es' ? 'Total estimado' : 'Estimated total',
    taxNote:   lang === 'es' ? 'Impuestos incluidos' : 'Taxes included',
    whatsApp:  lang === 'es' ? 'Confirmar por WhatsApp' : 'Confirm via WhatsApp',
    footer1:   lang === 'es' ? 'Si tienes preguntas, no dudes en contactarnos.' : 'If you have any questions, feel free to contact us.',
    reception: lang === 'es' ? 'Recepción 24 horas' : '24-hour reception',
  };

  const waMsg = encodeURIComponent(
    lang === 'es'
      ? `Hola, mi código de pre-reserva es *${p.code}*. Me gustaría confirmarla.`
      : `Hello, my pre-booking code is *${p.code}*. I'd like to confirm it.`
  );

  return `<!DOCTYPE html>
<html lang="${lang}">
<head><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1.0">
<title>${L.subject}</title></head>
<body style="margin:0;padding:0;background-color:#FAF6F0;font-family:Arial,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background-color:#FAF6F0;">
  <tr><td align="center" style="padding:40px 20px;">
    <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;background:#ffffff;border:1px solid rgba(42,38,32,0.1);">

      <!-- Header -->
      <tr><td style="background-color:#8B6F47;padding:40px;text-align:center;">
        <p style="margin:0 0 6px;color:#C9A86B;font-size:10px;text-transform:uppercase;letter-spacing:3px;">Cartagena de Indias · Colombia</p>
        <h1 style="margin:0 0 6px;color:#ffffff;font-size:26px;font-weight:400;letter-spacing:1px;">Casa Boutique San Diego</h1>
        <p style="margin:0;color:rgba(255,255,255,0.65);font-style:italic;font-size:13px;">Una casa colonial. Una experiencia inolvidable.</p>
      </td></tr>

      <!-- Code block -->
      <tr><td style="background-color:#F5EDE0;padding:28px 40px;text-align:center;border-bottom:1px solid rgba(42,38,32,0.1);">
        <p style="margin:0 0 6px;color:#9A9088;font-size:10px;text-transform:uppercase;letter-spacing:2px;">${L.codeLabel}</p>
        <p style="margin:0;color:#8B6F47;font-size:34px;letter-spacing:6px;font-weight:300;">${p.code}</p>
      </td></tr>

      <!-- Body -->
      <tr><td style="padding:40px;">
        <p style="margin:0 0 6px;color:#2A2620;font-size:18px;font-weight:400;">${L.greeting},</p>
        <p style="margin:0 0 28px;color:#6B6259;font-size:14px;line-height:1.7;">${L.intro}</p>

        <h2 style="margin:0 0 16px;color:#2A2620;font-size:15px;font-weight:600;">${L.detailsHd}</h2>
        <table width="100%" cellpadding="0" cellspacing="0">
          ${detailRow(L.dateLabel, `${p.checkIn} – ${p.checkOut} (${L.nights})`)}
          ${detailRow(L.guestLbl, L.guests)}
          ${detailRow(L.roomLbl, ROOM_NAMES[p.roomSlug]?.[lang] ?? p.roomSlug)}
          ${detailRow(L.rateLbl, fmt(price))}
          ${extrasHtml}
          <tr>
            <td style="padding:16px 0 0;color:#6B6259;font-size:12px;font-family:Arial,sans-serif;">${L.totalLbl}</td>
            <td style="padding:16px 0 0;font-size:22px;color:#8B6F47;font-weight:300;text-align:right;">${fmt(lang === 'en' ? p.grandTotalUSD : p.grandTotalCOP)}</td>
          </tr>
          <tr><td colspan="2" style="padding:0 0 20px;color:#9A9088;font-size:11px;text-align:right;">${L.taxNote}</td></tr>
        </table>

        ${p.guest.requests ? `<div style="background:#F5EDE0;border-left:3px solid #C9A86B;padding:12px 16px;margin-top:8px;border-radius:0 4px 4px 0;">
          <p style="margin:0 0 4px;color:#9A9088;font-size:10px;text-transform:uppercase;letter-spacing:1px;">${lang === 'es' ? 'Peticiones especiales' : 'Special requests'}</p>
          <p style="margin:0;color:#2A2620;font-size:13px;">${p.guest.requests}</p>
        </div>` : ''}

        <div style="margin-top:28px;text-align:center;">
          <a href="https://wa.me/573052345678?text=${waMsg}" style="display:inline-block;background-color:#8B6F47;color:#ffffff;text-decoration:none;padding:14px 32px;font-size:13px;letter-spacing:0.5px;border-radius:2px;">${L.whatsApp}</a>
        </div>

        <p style="margin:28px 0 0;color:#9A9088;font-size:12px;text-align:center;">${L.footer1}</p>
      </td></tr>

      <!-- Footer -->
      <tr><td style="background-color:#F5EDE0;padding:24px 40px;text-align:center;border-top:1px solid rgba(42,38,32,0.1);">
        <p style="margin:0 0 4px;color:#6B6259;font-size:12px;">Calle de las Bóvedas #39-67, Barrio San Diego, Cartagena de Indias</p>
        <p style="margin:0 0 4px;color:#6B6259;font-size:12px;">+57 305 234 5678 · reservas@casaboutiquesandiego.com</p>
        <p style="margin:8px 0 0;color:#9A9088;font-size:11px;">${L.reception}</p>
      </td></tr>

    </table>
  </td></tr>
</table>
</body></html>`;
}

export function buildHotelEmail(p: BookingPayload): string {
  const extras = p.extras.map((id) => {
    const extra = EXTRAS.find((e) => e.id === id);
    return extra ? `${extra.label.es} (+${fmtCOP(calcExtraPrice(extra, p.adults, p.nights))})` : id;
  }).join(', ') || 'Ninguno';

  return `<!DOCTYPE html>
<html>
<head><meta charset="UTF-8"><title>Nueva pre-reserva: ${p.code}</title></head>
<body style="font-family:Arial,sans-serif;background:#FAF6F0;padding:40px 20px;">
<div style="max-width:560px;margin:0 auto;background:#fff;border:1px solid rgba(42,38,32,0.12);padding:32px;">
  <div style="background:#4A3829;padding:20px;margin:-32px -32px 24px;text-align:center;">
    <p style="margin:0;color:#C9A86B;font-size:11px;text-transform:uppercase;letter-spacing:2px;">Notificación interna — Hotel</p>
    <h2 style="margin:6px 0 0;color:#fff;font-size:20px;font-weight:400;">Nueva pre-reserva recibida</h2>
  </div>
  <p style="font-size:22px;color:#8B6F47;letter-spacing:4px;text-align:center;margin:0 0 24px;">${p.code}</p>
  <table width="100%" cellpadding="0" cellspacing="0" style="border-collapse:collapse;">
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6B6259;font-size:12px;width:45%;">Huésped</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;color:#2A2620;font-size:13px;font-weight:500;">${p.guest.firstName} ${p.guest.lastName}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6B6259;font-size:12px;">Email</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;color:#2A2620;font-size:13px;"><a href="mailto:${p.guest.email}">${p.guest.email}</a></td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6B6259;font-size:12px;">Teléfono</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;color:#2A2620;font-size:13px;">${p.guest.phone}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6B6259;font-size:12px;">País</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;color:#2A2620;font-size:13px;">${p.guest.country}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6B6259;font-size:12px;">Fechas</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;color:#2A2620;font-size:13px;">${p.checkIn} → ${p.checkOut} (${p.nights} noches)</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6B6259;font-size:12px;">Huéspedes</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;color:#2A2620;font-size:13px;">${p.adults} adultos / ${p.children} niños</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6B6259;font-size:12px;">Habitación</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;color:#2A2620;font-size:13px;">${ROOM_NAMES[p.roomSlug]?.es ?? p.roomSlug}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6B6259;font-size:12px;">Extras</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;color:#2A2620;font-size:13px;">${extras}</td></tr>
    <tr><td style="padding:8px 0;border-bottom:1px solid #eee;color:#6B6259;font-size:12px;">Peticiones</td>
        <td style="padding:8px 0;border-bottom:1px solid #eee;color:#2A2620;font-size:13px;">${p.guest.requests || '—'}</td></tr>
    <tr><td style="padding:12px 0 0;color:#8B6F47;font-size:13px;font-weight:600;">Total COP</td>
        <td style="padding:12px 0 0;color:#8B6F47;font-size:18px;font-weight:300;">${fmtCOP(p.grandTotalCOP)}</td></tr>
    <tr><td style="padding:2px 0;color:#9A9088;font-size:12px;">Total USD</td>
        <td style="padding:2px 0;color:#9A9088;font-size:13px;">${fmtUSD(p.grandTotalUSD)}</td></tr>
  </table>
</div>
</body></html>`;
}
