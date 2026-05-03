import { NextRequest, NextResponse } from 'next/server';
import { Resend } from 'resend';

const FROM  = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
const HOTEL = process.env.HOTEL_NOTIFICATION_EMAIL ?? 'reservas@casaboutiquesandiego.com';

interface ContactPayload {
  name: string;
  email: string;
  phone?: string;
  message: string;
  locale: string;
}

export async function POST(req: NextRequest) {
  let payload: ContactPayload;
  try {
    payload = (await req.json()) as ContactPayload;
  } catch {
    return NextResponse.json({ error: 'Invalid payload' }, { status: 400 });
  }

  const { name, email, phone, message, locale } = payload;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
  }

  // If Resend is not configured, return success without sending (dev mode)
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey || apiKey === 're_REEMPLAZA_CON_TU_API_KEY') {
    console.info('[contact] Resend not configured — skipping email send', { name, email });
    return NextResponse.json({ ok: true });
  }

  const resend = new Resend(apiKey);
  const isEs = locale !== 'en';

  const subject = isEs
    ? `Nuevo mensaje de contacto — ${name}`
    : `New contact message — ${name}`;

  const html = `
    <div style="font-family: Georgia, serif; max-width: 560px; margin: 0 auto; color: #2A2620;">
      <div style="background: #4A3829; padding: 24px 32px;">
        <p style="color: #C9A86B; font-size: 11px; letter-spacing: 0.18em; text-transform: uppercase; margin: 0;">
          Casa Boutique San Diego
        </p>
        <h1 style="color: #FAF6F0; font-size: 22px; font-weight: 400; margin: 8px 0 0;">
          ${isEs ? 'Nuevo mensaje de contacto' : 'New contact message'}
        </h1>
      </div>
      <div style="padding: 32px; background: #FFFFFF; border: 1px solid #F5EDE0;">
        <table style="width: 100%; border-collapse: collapse;">
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #F5EDE0; font-size: 12px; color: #9A9088; text-transform: uppercase; letter-spacing: 0.12em; width: 120px;">${isEs ? 'Nombre' : 'Name'}</td><td style="padding: 8px 0; border-bottom: 1px solid #F5EDE0; font-size: 15px;">${name}</td></tr>
          <tr><td style="padding: 8px 0; border-bottom: 1px solid #F5EDE0; font-size: 12px; color: #9A9088; text-transform: uppercase; letter-spacing: 0.12em;">Email</td><td style="padding: 8px 0; border-bottom: 1px solid #F5EDE0; font-size: 15px;"><a href="mailto:${email}" style="color: #8B6F47;">${email}</a></td></tr>
          ${phone ? `<tr><td style="padding: 8px 0; border-bottom: 1px solid #F5EDE0; font-size: 12px; color: #9A9088; text-transform: uppercase; letter-spacing: 0.12em;">${isEs ? 'Teléfono' : 'Phone'}</td><td style="padding: 8px 0; border-bottom: 1px solid #F5EDE0; font-size: 15px;">${phone}</td></tr>` : ''}
        </table>
        <div style="margin-top: 24px;">
          <p style="font-size: 12px; color: #9A9088; text-transform: uppercase; letter-spacing: 0.12em; margin: 0 0 8px;">${isEs ? 'Mensaje' : 'Message'}</p>
          <p style="font-size: 15px; line-height: 1.7; color: #2A2620; background: #FAF6F0; padding: 16px; margin: 0;">${message.replace(/\n/g, '<br>')}</p>
        </div>
        <div style="margin-top: 24px; padding-top: 16px; border-top: 1px solid #F5EDE0;">
          <a href="mailto:${email}?subject=Re: ${encodeURIComponent(subject)}" style="display: inline-block; background: #8B6F47; color: #FFFFFF; font-size: 13px; font-family: Arial, sans-serif; text-decoration: none; padding: 10px 20px;">
            ${isEs ? 'Responder' : 'Reply'}
          </a>
        </div>
      </div>
      <div style="padding: 16px 32px; background: #FAF6F0; text-align: center;">
        <p style="font-size: 11px; color: #9A9088; margin: 0;">Calle de las Bóvedas #39-67 · Barrio San Diego · Cartagena de Indias</p>
      </div>
    </div>
  `;

  try {
    await resend.emails.send({ from: FROM, to: HOTEL, replyTo: email, subject, html });
    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('[contact] Resend error', err);
    return NextResponse.json({ error: 'Email send failed' }, { status: 500 });
  }
}
