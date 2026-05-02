'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, ChevronDown, MessageCircle } from 'lucide-react';
import { QuickSearchWidget } from '@/components/reservas/quick-search-widget';

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1920&q=85&auto=format&fit=crop';

const WHATSAPP_URL =
  'https://wa.me/573052345678?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20en%20Casa%20Boutique%20San%20Diego.';

function fadeUp(delay: number) {
  return {
    initial: { opacity: 0, y: 28 },
    animate: { opacity: 1, y: 0 },
    transition: {
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  };
}

function fadeIn(delay: number) {
  return {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    transition: { duration: 0.7, ease: 'easeOut' as const, delay },
  };
}

export function HeroCinematic() {
  const t = useTranslations('hero');
  const locale = useLocale();
  const prefix = locale === 'en' ? '/en' : '';

  const titleLines = t('title').split('\n');

  return (
    <section
      className="relative w-full overflow-hidden"
      style={{ height: '100svh', minHeight: '600px' }}
      aria-label={locale === 'es' ? 'Sección principal' : 'Hero section'}
    >
      {/* Background image — Ken Burns animation via Tailwind */}
      <div className="absolute inset-0">
        <Image
          src={HERO_IMAGE}
          alt={
            locale === 'es'
              ? 'Patio colonial tropical de Casa Boutique San Diego, Cartagena'
              : 'Tropical colonial courtyard of Casa Boutique San Diego, Cartagena'
          }
          fill
          priority
          quality={85}
          className="object-cover animate-ken-burns"
          sizes="100vw"
        />
      </div>

      {/* Cinematic gradient overlay */}
      <div className="absolute inset-0 hero-gradient" aria-hidden="true" />

      {/* Vignette sides */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at center, transparent 40%, rgba(26,22,18,0.35) 100%)',
        }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col">
        {/* Spacer for navbar */}
        <div style={{ height: 'var(--navbar-height)' }} />

        {/* Main content */}
        <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">

          {/* Travelers' Choice badge */}
          <motion.div {...fadeIn(0.1)} className="mb-6">
            <span className="inline-flex items-center gap-1.5 bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 font-inter text-xs tracking-wide px-3.5 py-1.5 rounded-full">
              <Star size={11} className="text-hotel-gold fill-hotel-gold" />
              {t('badge')}
            </span>
          </motion.div>

          {/* Pre-title */}
          <motion.p
            {...fadeUp(0.2)}
            className="text-pretitle text-white/65 mb-5"
          >
            {t('pretitle')}
          </motion.p>

          {/* H1 */}
          <motion.h1
            {...fadeUp(0.35)}
            className="font-cormorant font-light text-white text-balance leading-[1.05] tracking-tight mb-6"
            style={{ fontSize: 'clamp(2.6rem, 6.5vw, 5.2rem)' }}
          >
            {titleLines.map((line, i) => (
              <span key={i} className="block">
                {i === 0 ? (
                  line
                ) : (
                  <em className="not-italic font-extralight text-hotel-gold-light">
                    {line}
                  </em>
                )}
              </span>
            ))}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            {...fadeUp(0.5)}
            className="font-inter text-white/75 text-balance leading-relaxed mb-10 max-w-xl"
            style={{ fontSize: 'clamp(0.9rem, 1.8vw, 1.05rem)' }}
          >
            {t('subtitle')}
          </motion.p>

          {/* CTA buttons */}
          <motion.div
            {...fadeUp(0.6)}
            className="flex flex-col sm:flex-row items-center gap-3 mb-12"
          >
            <Link
              href={`${prefix}/reservar`}
              className="inline-flex items-center justify-center gap-2 bg-hotel-primary hover:bg-hotel-deep text-white font-inter text-sm font-semibold tracking-widest uppercase px-8 py-3.5 rounded-sm transition-all duration-300 active:scale-[0.98] shadow-hotel"
            >
              {locale === 'es' ? 'Reservar ahora' : 'Book now'}
            </Link>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 border border-white/35 hover:border-white/70 text-white/85 hover:text-white font-inter text-sm font-medium px-6 py-3.5 rounded-sm transition-all duration-300 active:scale-[0.98] backdrop-blur-sm"
            >
              <MessageCircle size={14} strokeWidth={1.5} />
              WhatsApp
            </a>
          </motion.div>
        </div>

        {/* Quick search widget — bottom */}
        <motion.div {...fadeUp(0.75)} className="px-6 pb-10 md:pb-14">
          <QuickSearchWidget />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          {...fadeIn(0.9)}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none"
          aria-hidden="true"
        >
          <span className="font-inter text-[10px] tracking-[0.2em] uppercase text-white/45">
            {t('scrollHint')}
          </span>
          <ChevronDown
            size={16}
            strokeWidth={1.5}
            className="text-white/45 animate-scroll-hint"
          />
        </motion.div>
      </div>
    </section>
  );
}
