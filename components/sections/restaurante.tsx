'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, Clock, Users, Star } from 'lucide-react';
import { BLUR_GOLD } from '@/lib/blur-placeholder';

const IMG_RESTAURANT =
  'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1000&q=85&auto=format&fit=crop';

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 28 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' } as const,
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  };
}

export function Restaurante() {
  const t = useTranslations('restaurant');
  const locale = useLocale();
  const prefix = locale === 'en' ? '/en' : '';

  const stats = [
    { Icon: Clock,  label: t('scheduleLabel'), value: t('scheduleValue') },
    { Icon: Users,  label: t('accessLabel'),   value: t('accessValue')   },
    { Icon: Star,   label: t('tastingLabel'),  value: t('tastingValue')  },
  ];

  return (
    <section className="bg-hotel-deep overflow-hidden">
      <div className="grid lg:grid-cols-2 min-h-[640px]">

        {/* ── Image column ──────────────────────────────────────── */}
        <motion.div
          initial={{ opacity: 0, scale: 1.05 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="relative min-h-[400px] lg:min-h-full order-last lg:order-first"
        >
          <Image
            src={IMG_RESTAURANT}
            alt={
              locale === 'en'
                ? 'El Patio de las Bóvedas – signature restaurant, Casa Boutique San Diego'
                : 'El Patio de las Bóvedas – restaurante de autor, Casa Boutique San Diego'
            }
            fill
            quality={88}
            placeholder="blur"
            blurDataURL={BLUR_GOLD}
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          {/* Overlay gradient to blend with dark section */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-hotel-deep/40 hidden lg:block" />
        </motion.div>

        {/* ── Content column ────────────────────────────────────── */}
        <div className="px-8 py-20 lg:px-16 xl:px-20 lg:py-24 flex flex-col justify-center">

          <motion.p {...fadeUp(0)} className="text-pretitle text-hotel-gold mb-3">
            {t('pretitle')}
          </motion.p>

          <motion.div {...fadeUp(0.06)} className="gold-divider mb-6" />

          <motion.h2 {...fadeUp(0.1)} className="text-h2 text-white mb-8 text-balance leading-tight">
            {t('title')}
          </motion.h2>

          <div className="space-y-4 mb-10">
            {(['p1', 'p2'] as const).map((key, i) => (
              <motion.p
                key={key}
                {...fadeUp(0.18 + i * 0.08)}
                className="font-inter text-[1rem] leading-[1.75] text-white/65"
              >
                {t(key)}
              </motion.p>
            ))}
          </div>

          {/* Stats */}
          <motion.div {...fadeUp(0.36)} className="space-y-4 mb-12">
            {stats.map(({ Icon, label, value }) => (
              <div key={label} className="flex items-start gap-4 border-b border-white/10 pb-4 last:border-0 last:pb-0">
                <div className="mt-0.5 w-8 h-8 rounded-full bg-hotel-gold/15 flex items-center justify-center shrink-0">
                  <Icon size={14} className="text-hotel-gold" strokeWidth={1.5} />
                </div>
                <div>
                  <span className="font-inter text-[10px] uppercase tracking-[0.18em] text-white/40 block mb-0.5">
                    {label}
                  </span>
                  <span className="font-inter text-[0.875rem] text-white/80 leading-snug">
                    {value}
                  </span>
                </div>
              </div>
            ))}
          </motion.div>

          {/* CTAs */}
          <motion.div {...fadeUp(0.45)} className="flex flex-wrap gap-4">
            <Link
              href={`${prefix}/restaurante`}
              className="btn-hotel-primary flex items-center gap-2"
            >
              {t('cta1')}
              <ArrowRight size={14} strokeWidth={1.5} />
            </Link>
            <a
              href="https://wa.me/573052345678?text=Hola%2C%20quisiera%20reservar%20una%20mesa%20en%20El%20Patio%20de%20las%20B%C3%B3vedas."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/30 text-white font-inter font-medium text-sm tracking-wide px-7 py-3.5 rounded-sm transition-all duration-300 hover:bg-white/10 hover:border-white/55 active:scale-[0.98]"
            >
              {t('cta2')}
            </a>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
