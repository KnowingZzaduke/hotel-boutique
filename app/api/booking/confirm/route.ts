import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';
import { buildGuestEmail, buildHotelEmail } from '@/lib/booking-email';
import type { BookingPayload } from '@/types/reservation';

const resend = new Resend(process.env.RESEND_API_KEY);

const FROM    = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
const HOTEL   = process.env.HOTEL_NOTIFICATION_EMAIL ?? 'reservas@casaboutiquesandiego.com';

export async function POST(req: NextRequest) {
  if (!process.env.RESEND_API_KEY || process.env.RESEND_API_KEY === 're_REEMPLAZA_CON_TU_API_KEY') {
    return NextResponse.json({ error: 'RESEND_API_KEY not configured' }, { status: 503 });
  }

  let payload: BookingPayload;
  try {
    payload = (await req.json()) as BookingPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const lang = payload.locale;
  const guestSubject = lang === 'es'
    ? `Tu pre-reserva en Casa Boutique San Diego — ${payload.code}`
    : `Your pre-booking at Casa Boutique San Diego — ${payload.code}`;

  const [guestResult, hotelResult] = await Promise.allSettled([
    resend.emails.send({
      from:    FROM,
      to:      payload.guest.email,
      subject: guestSubject,
      html:    buildGuestEmail(payload),
    }),
    resend.emails.send({
      from:    FROM,
      to:      HOTEL,
      subject: `Nueva pre-reserva: ${payload.code} — ${payload.guest.firstName} ${payload.guest.lastName}`,
      html:    buildHotelEmail(payload),
    }),
  ]);

  const guestOk = guestResult.status === 'fulfilled' && !guestResult.value.error;
  const hotelOk = hotelResult.status === 'fulfilled' && !hotelResult.value.error;

  if (!guestOk && !hotelOk) {
    console.error('[booking/confirm] Both emails failed:', guestResult, hotelResult);
    return NextResponse.json({ error: 'Email delivery failed' }, { status: 500 });
  }

  return NextResponse.json({ ok: true, guestSent: guestOk, hotelSent: hotelOk });
}
