import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { ContactoReservas } from '@/components/sections/contacto-reservas';
import { Ubicacion } from '@/components/sections/ubicacion';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Contacto' : 'Contact',
    description: isEs
      ? 'Contacta con Casa Boutique San Diego. Recepción 24 horas, WhatsApp y formulario de contacto. Respondemos en menos de 2 horas.'
      : 'Contact Casa Boutique San Diego. 24-hour reception, WhatsApp and contact form. We respond in under 2 hours.',
  };
}

export default async function ContactoPage() {
  const locale = await getLocale();
  const isEs = locale === 'es';

  return (
    <div className="min-h-screen bg-hotel-bg">

      {/* Page header */}
      <div className="pt-32 pb-14 bg-hotel-surface-alt">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <p className="text-pretitle text-hotel-gold mb-3">{isEs ? 'Estamos aquí' : 'We are here'}</p>
          <div className="gold-divider mb-6" />
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] text-hotel-text leading-tight">
            {isEs ? 'Contacto' : 'Contact us'}
          </h1>
        </div>
      </div>

      <ContactoReservas />
      <Ubicacion />

    </div>
  );
}
