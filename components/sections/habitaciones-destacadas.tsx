'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { ROOMS, formatPriceCOP } from '@/lib/rooms-data';
import type { Room } from '@/types/room';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 32 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' } as const,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  };
}

function RoomCard({ room, index }: { room: Room; index: number }) {
  const t = useTranslations('rooms');
  const locale = useLocale();
  const lang = locale === 'en' ? 'en' : 'es';
  const prefix = locale === 'en' ? '/en' : '';
  const price =
    locale === 'en' ? `$${room.priceUSD} USD` : formatPriceCOP(room.priceCOP);

  return (
    <motion.article
      {...fadeUp(index * 0.12)}
      className="group bg-hotel-surface shadow-hotel hover:shadow-hotel-lg transition-shadow duration-500 flex flex-col"
    >
      {/* Image */}
      <div className="relative aspect-[4/3] md:aspect-[3/4] overflow-hidden shrink-0">
        <Image
          src={room.imageUrl}
          alt={room.imageAlt[lang]}
          fill
          quality={85}
          className="object-cover transition-transform duration-700 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col flex-1 p-6">
        <div className="flex items-start justify-between gap-3 mb-2">
          <h3 className="font-playfair text-xl text-hotel-text leading-snug">
            {t(`${room.slug}.name`)}
          </h3>
          <span className="font-inter text-xs text-hotel-text-tertiary mt-1 shrink-0 whitespace-nowrap">
            {room.sqm} m²
          </span>
        </div>

        <p className="font-cormorant italic text-hotel-gold text-[1.1rem] leading-snug mb-4">
          {t(`${room.slug}.tagline`)}
        </p>

        <p className="font-inter text-sm text-hotel-text-secondary leading-relaxed mb-5 line-clamp-3 flex-1">
          {t(`${room.slug}.desc`)}
        </p>

        <div className="gold-divider mb-4" />

        <div className="flex items-end justify-between gap-3">
          <div>
            <span className="font-inter text-[11px] uppercase tracking-wider text-hotel-text-tertiary block mb-0.5">
              {t('fromPrice')}
            </span>
            <span className="font-cormorant text-[1.55rem] text-hotel-text font-light leading-none">
              {price}
            </span>
            <span className="font-inter text-[11px] text-hotel-text-tertiary ml-1">
              {t('perNight')}
            </span>
          </div>
          <Link
            href={`${prefix}/habitaciones/${room.slug}`}
            className="btn-hotel-ghost flex items-center gap-1 shrink-0 text-[0.8rem]"
            aria-label={`${t('viewDetails')}: ${t(`${room.slug}.name`)}`}
          >
            {t('viewDetails')}
            <ArrowRight size={13} strokeWidth={1.5} />
          </Link>
        </div>
      </div>
    </motion.article>
  );
}

export function HabitacionesDestacadas() {
  const t = useTranslations('rooms');
  const locale = useLocale();
  const prefix = locale === 'en' ? '/en' : '';

  return (
    <section className="bg-hotel-surface-alt py-24 lg:py-32">
      <div className="section-container">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-14 lg:mb-20">
          <p className="text-pretitle text-hotel-gold mb-3">{t('pretitle')}</p>
          <div className="gold-divider mx-auto mb-5" />
          <h2 className="text-h2 text-hotel-text">{t('title')}</h2>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-14">
          {ROOMS.map((room, i) => (
            <RoomCard key={room.slug} room={room} index={i} />
          ))}
        </div>

        {/* CTA */}
        <motion.div {...fadeUp(0.35)} className="text-center">
          <Link href={`${prefix}/habitaciones`} className="btn-hotel-outline">
            {t('cta')}
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
