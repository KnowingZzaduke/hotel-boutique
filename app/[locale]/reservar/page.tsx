import type { Metadata } from 'next';
import { getLocale } from 'next-intl/server';
import { BookingWizard } from '@/components/reservas/booking-wizard';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isEs   = locale === 'es';

  return {
    title: isEs ? 'Reservar' : 'Book Your Stay',
    description: isEs
      ? 'Reserva tu estancia en Casa Boutique San Diego. Elige tu habitación, personaliza tus extras y confirma en minutos.'
      : 'Book your stay at Casa Boutique San Diego. Choose your room, personalize your extras and confirm in minutes.',
  };
}

export default async function ReservarPage() {
  const locale = await getLocale();
  const isEs   = locale === 'es';

  return (
    <div className="pt-32 pb-24 min-h-screen bg-hotel-bg">
      <div className="section-container">
        {/* Page header */}
        <header className="mb-12 lg:mb-16">
          <p className="text-pretitle mb-3">
            {isEs ? 'Tu estancia' : 'Your stay'}
          </p>
          <h1 className="font-playfair text-4xl lg:text-5xl text-hotel-text">
            {isEs ? 'Haz tu reserva' : 'Make your reservation'}
          </h1>
          <div className="gold-divider mt-5" />
        </header>

        <BookingWizard />
      </div>
    </div>
  );
}
