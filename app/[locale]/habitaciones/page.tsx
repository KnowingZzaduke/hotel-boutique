import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowRight, Users, Maximize2 } from 'lucide-react';
import { ROOMS, formatPriceCOP } from '@/lib/rooms-data';
import { JsonLd } from '@/components/shared/json-ld';
import { breadcrumbSchema } from '@/lib/schema';
import { BLUR_GOLD } from '@/lib/blur-placeholder';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Habitaciones' : 'Rooms',
    description: isEs
      ? '3 habitaciones únicas en una casa colonial del siglo XVIII. Habitación Patio, Habitación Balcón y Suite Mirador. Precios desde $850.000 COP/noche.'
      : '3 unique rooms in an 18th-century colonial house. Patio Room, Balcony Room and Mirador Suite. Prices from $210 USD/night.',
  };
}

export default async function HabitacionesPage() {
  const locale = await getLocale();
  const t = await getTranslations('rooms');
  const isEs = locale === 'es';
  const lang = isEs ? 'es' : 'en';
  const prefix = isEs ? '' : '/en';

  return (
    <div className="pt-32 pb-24 min-h-screen bg-hotel-bg">
      <JsonLd data={breadcrumbSchema([
        { name: isEs ? 'Inicio' : 'Home', url: isEs ? '/' : '/en' },
        { name: isEs ? 'Habitaciones' : 'Rooms', url: isEs ? '/habitaciones' : '/en/habitaciones' },
      ])} />
      <div className="section-container">

        {/* Page header */}
        <header className="mb-16 lg:mb-20">
          <p className="text-pretitle text-hotel-gold mb-3">
            {isEs ? 'Alojamiento' : 'Accommodation'}
          </p>
          <div className="gold-divider mb-6" />
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] text-hotel-text leading-tight mb-4">
            {t('title')}
          </h1>
          <p className="font-cormorant italic text-[1.2rem] text-hotel-text-secondary max-w-xl">
            {isEs
              ? 'Doce habitaciones, tres estilos, un solo espíritu colonial. Cada una restaurada piedra a piedra para que el siglo XVIII y el lujo moderno convivan en perfecta armonía.'
              : 'Twelve rooms, three styles, one colonial spirit. Each one restored stone by stone so the 18th century and modern luxury coexist in perfect harmony.'}
          </p>
        </header>

        {/* Rooms list */}
        <div className="space-y-8">
          {ROOMS.map((room, i) => {
            const price = isEs ? formatPriceCOP(room.priceCOP) : `$${room.priceUSD} USD`;
            const isReversed = i % 2 !== 0;

            return (
              <article
                key={room.slug}
                className="group bg-hotel-surface shadow-hotel overflow-hidden grid lg:grid-cols-2 min-h-[420px]"
              >
                {/* Image */}
                <div className={`relative overflow-hidden min-h-[280px] lg:min-h-full ${isReversed ? 'lg:order-last' : ''}`}>
                  <Image
                    src={room.imageUrl}
                    alt={room.imageAlt[lang]}
                    fill
                    quality={85}
                    placeholder="blur"
                    blurDataURL={BLUR_GOLD}
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                  {/* Availability badge */}
                  <div className="absolute top-5 left-5">
                    <span className="font-inter text-[10px] uppercase tracking-[0.18em] bg-hotel-deep/80 text-hotel-gold px-3 py-1.5 backdrop-blur-sm">
                      {isEs ? 'Disponible' : 'Available'}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8 lg:p-12 flex flex-col justify-center">
                  <p className="font-cormorant italic text-hotel-gold text-[1rem] mb-2">
                    {room.view[lang]}
                  </p>
                  <h2 className="font-playfair text-[1.75rem] lg:text-[2rem] text-hotel-text mb-3 leading-tight">
                    {t(`${room.slug}.name`)}
                  </h2>
                  <p className="font-cormorant italic text-hotel-text-secondary text-[1.1rem] mb-5">
                    {t(`${room.slug}.tagline`)}
                  </p>
                  <p className="font-inter text-[0.875rem] text-hotel-text-secondary leading-relaxed mb-6 line-clamp-3">
                    {room.description[lang][0]}
                  </p>

                  {/* Stats row */}
                  <div className="flex items-center gap-6 mb-6 pb-6 border-b border-hotel-text/10">
                    <div className="flex items-center gap-2 text-hotel-text-secondary">
                      <Maximize2 size={14} strokeWidth={1.5} className="text-hotel-gold" />
                      <span className="font-inter text-[0.8rem]">{room.sqm} m²</span>
                    </div>
                    <div className="flex items-center gap-2 text-hotel-text-secondary">
                      <Users size={14} strokeWidth={1.5} className="text-hotel-gold" />
                      <span className="font-inter text-[0.8rem]">
                        {isEs ? `Hasta ${room.maxGuests} huéspedes` : `Up to ${room.maxGuests} guests`}
                      </span>
                    </div>
                  </div>

                  {/* Amenities */}
                  <div className="flex flex-wrap gap-2 mb-8">
                    {room.amenities.map((a) => (
                      <span key={a} className="font-inter text-[11px] text-hotel-text-tertiary border border-hotel-text/10 px-2.5 py-1">
                        {a}
                      </span>
                    ))}
                  </div>

                  {/* Price + CTA */}
                  <div className="flex flex-wrap items-end justify-between gap-4">
                    <div>
                      <span className="font-inter text-[10px] uppercase tracking-wider text-hotel-text-tertiary block mb-0.5">
                        {t('fromPrice')}
                      </span>
                      <span className="font-cormorant text-[2rem] text-hotel-text font-light leading-none">
                        {price}
                      </span>
                      <span className="font-inter text-[11px] text-hotel-text-tertiary ml-1.5">
                        {t('perNight')}
                      </span>
                    </div>
                    <div className="flex gap-3 flex-wrap">
                      <Link
                        href={`${prefix}/habitaciones/${room.slug}`}
                        className="btn-hotel-outline flex items-center gap-1.5"
                      >
                        {t('viewDetails')}
                        <ArrowRight size={13} strokeWidth={1.5} />
                      </Link>
                      <Link href={`${prefix}/reservar`} className="btn-hotel-primary">
                        {isEs ? 'Reservar' : 'Book'}
                      </Link>
                    </div>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

      </div>
    </div>
  );
}
