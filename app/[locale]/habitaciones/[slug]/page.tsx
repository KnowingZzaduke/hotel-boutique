import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getLocale, getTranslations } from 'next-intl/server';
import { ArrowLeft, ArrowRight, Users, Maximize2, Wind, Bath, Wifi, Wine, DoorOpen, Coffee, Sun, Waves, Crown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { ROOMS, formatPriceCOP, getRoomBySlug, getAdjacentRooms } from '@/lib/rooms-data';
import { RoomGalleryClient } from './room-gallery-client';

const AMENITY_ICONS: Record<string, LucideIcon> = {
  'A/C':       Wind,
  'Tina':      Bath,
  'WiFi':      Wifi,
  'Minibar':   Wine,
  'Balcón':    DoorOpen,
  'Nespresso': Coffee,
  'Terraza':   Sun,
  'Jacuzzi':   Waves,
  'Mayordomo': Crown,
};

export async function generateStaticParams() {
  return ROOMS.map((room) => ({ slug: room.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const locale = await getLocale();
  const isEs = locale === 'es';
  const t = await getTranslations('rooms');
  const room = getRoomBySlug(params.slug);
  if (!room) return {};
  const name = t(`${room.slug}.name`);
  return {
    title: name,
    description: isEs
      ? `${name} — ${room.sqm} m², ${room.view.es}. Desde ${formatPriceCOP(room.priceCOP)}/noche en Casa Boutique San Diego, Cartagena.`
      : `${name} — ${room.sqm} m², ${room.view.en}. From $${room.priceUSD} USD/night at Casa Boutique San Diego, Cartagena.`,
  };
}

export default async function RoomDetailPage({ params }: { params: { slug: string } }) {
  const locale = await getLocale();
  const t = await getTranslations('rooms');
  const isEs = locale === 'es';
  const lang: 'es' | 'en' = isEs ? 'es' : 'en';
  const prefix = isEs ? '' : '/en';

  const room = getRoomBySlug(params.slug);
  if (!room) notFound();

  const { prev, next } = getAdjacentRooms(room.slug);
  const price = isEs ? formatPriceCOP(room.priceCOP) : `$${room.priceUSD} USD`;

  const galleryImages = room.gallery.map((img) => ({
    url: img.url,
    alt: img.alt[lang],
  }));

  return (
    <div className="min-h-screen bg-hotel-bg">

      {/* Hero */}
      <div className="relative h-[70vh] min-h-[480px] overflow-hidden">
        <Image
          src={room.gallery[0].url}
          alt={room.gallery[0].alt[lang]}
          fill
          quality={90}
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hotel-deep/80 via-hotel-deep/20 to-transparent" />

        {/* Breadcrumb */}
        <div className="absolute top-8 left-0 right-0 px-6 lg:px-12">
          <div className="max-w-screen-xl mx-auto">
            <nav className="flex items-center gap-2 font-inter text-[11px] uppercase tracking-[0.16em] text-white/60">
              <Link href={`${prefix}/`} className="hover:text-white transition-colors">
                {isEs ? 'Inicio' : 'Home'}
              </Link>
              <span>/</span>
              <Link href={`${prefix}/habitaciones`} className="hover:text-white transition-colors">
                {isEs ? 'Habitaciones' : 'Rooms'}
              </Link>
              <span>/</span>
              <span className="text-hotel-gold">{t(`${room.slug}.name`)}</span>
            </nav>
          </div>
        </div>

        {/* Hero text */}
        <div className="absolute bottom-12 left-0 right-0 px-6 lg:px-12">
          <div className="max-w-screen-xl mx-auto">
            <p className="font-cormorant italic text-hotel-gold text-[1.1rem] mb-2">{room.view[lang]}</p>
            <h1 className="font-playfair text-[2.8rem] lg:text-[4rem] text-white leading-none mb-3">
              {t(`${room.slug}.name`)}
            </h1>
            <p className="font-cormorant italic text-white/70 text-[1.3rem]">
              {t(`${room.slug}.tagline`)}
            </p>
          </div>
        </div>
      </div>

      {/* Highlights bar */}
      <div className="bg-hotel-deep border-b border-white/8">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-5 flex flex-wrap items-center gap-8">
          {([
            { Icon: Maximize2, value: `${room.sqm} m²`,                                       label: isEs ? 'Superficie'  : 'Size'     },
            { Icon: Users,     value: isEs ? `${room.maxGuests} huéspedes` : `${room.maxGuests} guests`, label: isEs ? 'Capacidad'  : 'Capacity' },
            { Icon: Sun,       value: room.view[lang],                                         label: isEs ? 'Vista'       : 'View'     },
          ] as const).map(({ Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={16} strokeWidth={1.5} className="text-hotel-gold" />
              <div>
                <p className="font-inter text-[10px] uppercase tracking-[0.14em] text-white/40">{label}</p>
                <p className="font-inter text-[0.85rem] text-white/80">{value}</p>
              </div>
            </div>
          ))}
          <div className="ml-auto hidden lg:block">
            <span className="font-cormorant text-[1.6rem] text-white font-light">{price}</span>
            <span className="font-inter text-[11px] text-white/40 ml-1.5">{t('perNight')}</span>
          </div>
        </div>
      </div>

      {/* Main content */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16 lg:py-24">
        <div className="grid lg:grid-cols-[1fr_340px] gap-12 lg:gap-16">

          {/* Left: description + amenities + gallery */}
          <div>
            {/* Description */}
            <div className="mb-10">
              <p className="text-pretitle text-hotel-gold mb-3">{isEs ? 'La habitación' : 'The room'}</p>
              <div className="gold-divider mb-8" />
              <div className="space-y-5">
                {room.description[lang].map((para, i) => (
                  <p key={i} className="font-inter text-[0.9375rem] leading-[1.8] text-hotel-text-secondary">
                    {para}
                  </p>
                ))}
              </div>
            </div>

            {/* Amenities */}
            <div className="mb-12">
              <h3 className="font-playfair text-[1.2rem] text-hotel-text mb-6">
                {isEs ? 'Servicios e incluidos' : 'Amenities & inclusions'}
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {room.amenities.map((a) => {
                  const Icon = AMENITY_ICONS[a] ?? Wind;
                  return (
                    <div key={a} className="flex items-center gap-3 bg-hotel-surface px-4 py-3">
                      <Icon size={15} strokeWidth={1.5} className="text-hotel-gold shrink-0" />
                      <span className="font-inter text-[0.8rem] text-hotel-text-secondary">{a}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Gallery (client component with lightbox) */}
            <RoomGalleryClient
              images={galleryImages}
              label={isEs ? 'Galería de la habitación' : 'Room gallery'}
            />
          </div>

          {/* Right: sticky booking card */}
          <div>
            <div className="lg:sticky lg:top-32 bg-hotel-surface shadow-hotel-lg p-8">
              <p className="font-inter text-[10px] uppercase tracking-[0.18em] text-hotel-text-tertiary mb-1">
                {t('fromPrice')}
              </p>
              <p className="font-cormorant text-[2.5rem] text-hotel-text font-light leading-none mb-1">
                {price}
              </p>
              <p className="font-inter text-[12px] text-hotel-text-tertiary mb-8">{t('perNight')}</p>

              <div className="gold-divider mb-8" />

              <Link
                href={`${prefix}/reservar`}
                className="btn-hotel-primary w-full justify-center mb-3 text-[0.875rem]"
              >
                {isEs ? 'Reservar esta habitación' : 'Book this room'}
                <ArrowRight size={14} strokeWidth={1.5} />
              </Link>
              <a
                href="https://wa.me/573052345678?text=Hola%2C%20me%20gustar%C3%ADa%20consultar%20disponibilidad."
                target="_blank"
                rel="noopener noreferrer"
                className="btn-hotel-outline w-full justify-center text-[0.875rem]"
              >
                {isEs ? 'Consultar disponibilidad' : 'Check availability'}
              </a>

              <div className="mt-8 space-y-3 border-t border-hotel-text/10 pt-6">
                {[
                  { label: 'Check-in',                                        value: '3:00 pm'                           },
                  { label: 'Check-out',                                       value: '12:00 pm'                          },
                  { label: isEs ? 'Cancelación' : 'Cancellation',            value: isEs ? '48 h antes' : '48 h before' },
                ].map(({ label, value }) => (
                  <div key={label} className="flex justify-between">
                    <span className="font-inter text-[11px] text-hotel-text-tertiary">{label}</span>
                    <span className="font-inter text-[11px] text-hotel-text">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Prev / Next navigation */}
      <div className="border-t border-hotel-text/8 bg-hotel-surface">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-2 divide-x divide-hotel-text/8">
            {([
              { room: prev, label: isEs ? 'Anterior' : 'Previous', Icon: ArrowLeft,  side: 'left'  },
              { room: next, label: isEs ? 'Siguiente' : 'Next',    Icon: ArrowRight, side: 'right' },
            ] as const).map(({ room: r, label, Icon, side }) => (
              <Link
                key={r.slug}
                href={`${prefix}/habitaciones/${r.slug}`}
                className={`group flex items-center gap-4 py-8 px-6 hover:bg-hotel-surface-alt transition-colors duration-300 ${side === 'right' ? 'flex-row-reverse text-right' : ''}`}
              >
                <div className="w-9 h-9 rounded-full border border-hotel-gold/30 flex items-center justify-center shrink-0 group-hover:bg-hotel-gold/10 transition-colors duration-300">
                  <Icon size={14} strokeWidth={1.5} className="text-hotel-gold" />
                </div>
                <div>
                  <p className="font-inter text-[10px] uppercase tracking-[0.16em] text-hotel-text-tertiary mb-1">{label}</p>
                  <p className="font-playfair text-[1rem] text-hotel-text">{t(`${r.slug}.name`)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
