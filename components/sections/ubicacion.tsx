'use client';

import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { MapPin, Plane, Waves, ShoppingBag, ExternalLink } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const HOTEL_LAT = 10.4296;
const HOTEL_LNG = -75.5496;

const GOOGLE_MAPS_URL = `https://www.google.com/maps/search/?api=1&query=${HOTEL_LAT},${HOTEL_LNG}`;

const OSM_EMBED = `https://www.openstreetmap.org/export/embed.html?bbox=${HOTEL_LNG - 0.01}%2C${HOTEL_LAT - 0.006}%2C${HOTEL_LNG + 0.01}%2C${HOTEL_LAT + 0.006}&layer=mapnik&marker=${HOTEL_LAT}%2C${HOTEL_LNG}`;

type DistanceKey = 'wall' | 'airport' | 'beach' | 'market';

const DISTANCE_ICONS: Record<DistanceKey, LucideIcon> = {
  wall:    MapPin,
  airport: Plane,
  beach:   Waves,
  market:  ShoppingBag,
};

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' } as const,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  };
}

export function Ubicacion() {
  const t = useTranslations('ubicacion');
  const locale = useLocale();

  const distanceKeys: DistanceKey[] = ['wall', 'airport', 'beach', 'market'];

  return (
    <section className="bg-hotel-bg py-24 lg:py-32 overflow-hidden">
      <div className="section-container">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-14 lg:mb-16">
          <p className="text-pretitle text-hotel-gold mb-3">{t('pretitle')}</p>
          <div className="gold-divider mx-auto mb-5" />
          <h2 className="text-h2 text-hotel-text mb-4">{t('title')}</h2>
          <p className="font-inter text-[0.875rem] text-hotel-text-tertiary tracking-wide">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Map + Info grid */}
        <div className="grid lg:grid-cols-[1fr_380px] gap-8 lg:gap-12 items-start">

          {/* Map */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-60px' }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative overflow-hidden shadow-hotel-xl rounded-sm"
          >
            <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[480px]">
              <iframe
                src={OSM_EMBED}
                title={locale === 'en' ? 'Hotel location map' : 'Mapa de ubicación del hotel'}
                className="absolute inset-0 w-full h-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
              {/* subtle vignette to blend map edges */}
              <div className="absolute inset-0 pointer-events-none ring-1 ring-inset ring-hotel-text/8" />
            </div>
          </motion.div>

          {/* Info panel */}
          <motion.div {...fadeUp(0.15)} className="flex flex-col gap-6">

            {/* Address block */}
            <div className="bg-hotel-surface shadow-hotel p-7">
              <div className="flex items-start gap-3 mb-5">
                <div className="mt-0.5 w-8 h-8 rounded-full bg-hotel-primary/10 flex items-center justify-center shrink-0">
                  <MapPin size={14} className="text-hotel-primary" strokeWidth={1.5} />
                </div>
                <div>
                  <p className="font-inter text-[10px] uppercase tracking-[0.18em] text-hotel-text-tertiary mb-1">
                    {t('directionsLabel')}
                  </p>
                  <p className="font-playfair text-[1.05rem] text-hotel-text leading-snug">
                    Calle de las Bóvedas #39-67
                  </p>
                  <p className="font-inter text-[0.825rem] text-hotel-text-secondary mt-0.5">
                    {locale === 'en'
                      ? 'San Diego District, Historic Walled Center'
                      : 'Barrio San Diego, Centro Histórico Amurallado'}
                  </p>
                  <p className="font-inter text-[0.825rem] text-hotel-text-tertiary">
                    Cartagena de Indias, Colombia
                  </p>
                </div>
              </div>

              <a
                href={GOOGLE_MAPS_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 font-inter text-[0.8rem] font-medium text-hotel-primary hover:text-hotel-deep transition-colors duration-200 underline underline-offset-4"
              >
                {t('directionsCta')}
                <ExternalLink size={12} strokeWidth={1.5} />
              </a>
            </div>

            {/* Distance cards */}
            <div className="grid grid-cols-2 gap-3">
              {distanceKeys.map((key, i) => {
                const Icon = DISTANCE_ICONS[key];
                return (
                  <motion.div
                    key={key}
                    {...fadeUp(0.2 + i * 0.07)}
                    className="bg-hotel-surface shadow-hotel p-5"
                  >
                    <div className="w-7 h-7 rounded-full bg-hotel-gold/10 flex items-center justify-center mb-3">
                      <Icon size={13} className="text-hotel-gold" strokeWidth={1.5} />
                    </div>
                    <p className="font-inter text-[0.75rem] text-hotel-text-secondary leading-snug mb-1">
                      {t(`distances.${key}.label`)}
                    </p>
                    <p className="font-cormorant font-light text-[1.1rem] text-hotel-text leading-none">
                      {t(`distances.${key}.value`)}
                    </p>
                  </motion.div>
                );
              })}
            </div>

          </motion.div>
        </div>

      </div>
    </section>
  );
}
