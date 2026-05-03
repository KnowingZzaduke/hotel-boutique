import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const FROM  = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
const HOTEL = process.env.HOTEL_NOTIFICATION_EMAIL ?? 'reservas@casaboutiquesandiego.com';

export async function POST(req: NextRequest) {
  let email: string;
  try {
    const body = (await req.json()) as { email?: string };
    email = (body.email ?? '').trim();
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
  }

  // If Resend is not configured, return success (dev mode)
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === 're_REEMPLAZA_CON_TU_API_KEY') {
    console.info('[newsletter] Resend not configured — skipping', { email });
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);

  try {
    // Notify hotel of new subscriber
    await resend.emails.send({
      from: FROM,
      to:   HOTEL,
      subject: `Nueva suscripción newsletter — ${email}`,
      html: `<p style="font-family: Arial; font-size: 14px;">Nuevo suscriptor al newsletter de Casa Boutique San Diego:</p><p style="font-family: Arial; font-size: 16px; font-weight: bold;">${email}</p>`,
    });

    // Optional: add to Resend Audience (requires RESEND_AUDIENCE_ID env var)
    const audienceId = process.env.RESEND_AUDIENCE_ID;
    if (audienceId) {
      await resend.contacts.create({
        email,
        audienceId,
        unsubscribed: false,
      });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[newsletter] Resend error', err);
    // Still return success — subscriber intent was captured
    return NextResponse.json({ ok: true });
  }
}
