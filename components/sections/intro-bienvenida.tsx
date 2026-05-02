'use client';

import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';

const IMG_MAIN =
  'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=900&q=85&auto=format&fit=crop';
const IMG_DETAIL =
  'https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?w=700&q=85&auto=format&fit=crop';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' } as const,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  };
}

export function IntroBienvenida() {
  const t = useTranslations('intro');
  const locale = useLocale();
  const lang = locale === 'en' ? 'en' : 'es';

  const stats = [
    { value: '12', label: t('stat1Label') },
    { value: '1.730', label: t('stat2Label') },
    { value: '2 min', label: t('stat3Label') },
  ];

  return (
    <section className="bg-hotel-bg py-24 lg:py-32 overflow-hidden">
      <div className="section-container">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">

          {/* ── Text column ───────────────────────────────────────── */}
          <div className="lg:col-span-6 xl:col-span-7">
            <motion.p {...fadeUp(0)} className="text-pretitle text-hotel-gold mb-3">
              {t('pretitle')}
            </motion.p>

            <motion.div {...fadeUp(0.06)} className="gold-divider mb-6" />

            <motion.h2 {...fadeUp(0.1)} className="text-h2 text-hotel-text mb-8 text-balance">
              {t('title')}
            </motion.h2>

            <div className="space-y-5">
              {(['p1', 'p2', 'p3'] as const).map((key, i) => (
                <motion.p key={key} {...fadeUp(0.18 + i * 0.07)} className="text-body-lg">
                  {t(key)}
                </motion.p>
              ))}
            </div>

            {/* Stats */}
            <motion.div
              {...fadeUp(0.4)}
              className="mt-12 pt-8 border-t border-hotel-text/10 grid grid-cols-3 gap-6"
            >
              {stats.map(({ value, label }) => (
                <div key={label}>
                  <span className="font-cormorant font-light text-[2.8rem] leading-none text-hotel-text block mb-1">
                    {value}
                  </span>
                  <span className="font-inter text-[11px] uppercase tracking-[0.14em] text-hotel-text-tertiary">
                    {label}
                  </span>
                </div>
              ))}
            </motion.div>
          </div>

          {/* ── Image mosaic ──────────────────────────────────────── */}
          <div className="lg:col-span-6 xl:col-span-5 grid grid-cols-[56%_44%] gap-3 items-end">

            {/* Main portrait image */}
            <motion.div
              {...fadeUp(0.2)}
              className="relative aspect-[2/3] overflow-hidden shadow-hotel-xl img-zoom-wrapper rounded-sm"
            >
              <Image
                src={IMG_MAIN}
                alt={
                  lang === 'es'
                    ? 'Patio colonial con vegetación tropical, Casa Boutique San Diego'
                    : 'Tropical colonial courtyard, Casa Boutique San Diego'
                }
                fill
                quality={85}
                className="object-cover"
                sizes="(max-width: 1024px) 56vw, 24vw"
              />
            </motion.div>

            {/* Right column: square image + dark badge */}
            <div className="flex flex-col gap-3 pb-4">
              <motion.div
                {...fadeUp(0.3)}
                className="relative aspect-square overflow-hidden shadow-hotel img-zoom-wrapper rounded-sm"
              >
                <Image
                  src={IMG_DETAIL}
                  alt={
                    lang === 'es'
                      ? 'Habitación de lujo con acabados coloniales'
                      : 'Luxury room with colonial finishes'
                  }
                  fill
                  quality={80}
                  className="object-cover"
                  sizes="(max-width: 1024px) 44vw, 18vw"
                />
              </motion.div>

              {/* "Fundada" badge */}
              <motion.div
                {...fadeUp(0.38)}
                className="bg-hotel-deep p-5 text-center shadow-hotel"
              >
                <span className="font-cormorant font-light text-[2.2rem] leading-none text-hotel-gold-light block">
                  1730
                </span>
                <span className="font-inter text-[10px] uppercase tracking-[0.2em] text-white/55 block mt-1.5">
                  {lang === 'es' ? 'Fundada' : 'Est.'}
                </span>
              </motion.div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
