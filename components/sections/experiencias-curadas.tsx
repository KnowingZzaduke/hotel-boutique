'use client';

import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { EXPERIENCES, formatExperiencePriceCOP } from '@/lib/experiences-data';

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

export function ExperienciasCuradas() {
  const t = useTranslations('experiences');
  const locale = useLocale();
  const lang = locale === 'en' ? 'en' : 'es';
  const prefix = locale === 'en' ? '/en' : '';

  return (
    <section className="bg-hotel-surface-alt py-24 lg:py-32">
      <div className="section-container">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-14 lg:mb-20">
          <p className="text-pretitle text-hotel-gold mb-3">{t('pretitle')}</p>
          <div className="gold-divider mx-auto mb-5" />
          <h2 className="text-h2 text-hotel-text mb-4">{t('title')}</h2>
          <p className="font-cormorant italic text-[1.25rem] text-hotel-text-secondary max-w-xl mx-auto">
            {t('subtitle')}
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-14">
          {EXPERIENCES.map((exp, i) => {
            const price =
              locale === 'en'
                ? `$${exp.priceUSD} USD`
                : formatExperiencePriceCOP(exp.priceCOP);

            return (
              <motion.div
                key={exp.id}
                {...fadeUp(i * 0.08)}
                className="group bg-hotel-surface p-8 shadow-hotel hover:shadow-hotel-lg transition-all duration-500 hover:-translate-y-1 flex flex-col"
              >
                {/* Icon + number */}
                <div className="flex items-start justify-between mb-6">
                  <div className="w-11 h-11 rounded-full bg-hotel-primary/10 group-hover:bg-hotel-primary/18 transition-colors duration-300 flex items-center justify-center">
                    <exp.Icon
                      size={18}
                      strokeWidth={1.5}
                      className="text-hotel-primary"
                    />
                  </div>
                  <span className="font-cormorant font-light text-[2rem] leading-none text-hotel-gold/30 select-none">
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>

                {/* Texts */}
                <h3 className="font-playfair text-[1.15rem] text-hotel-text mb-1 leading-snug">
                  {exp.title[lang]}
                </h3>
                <p className="font-cormorant italic text-hotel-gold text-[1rem] leading-snug mb-4">
                  {exp.tagline[lang]}
                </p>
                <p className="font-inter text-[0.875rem] text-hotel-text-secondary leading-relaxed mb-6 flex-1">
                  {exp.desc[lang]}
                </p>

                {/* Price + duration row */}
                <div className="gold-divider mb-4" />
                <div className="flex items-end justify-between gap-3">
                  <div>
                    <span className="font-inter text-[10px] uppercase tracking-wider text-hotel-text-tertiary block mb-0.5">
                      {t('from')}
                    </span>
                    <span className="font-cormorant text-[1.4rem] text-hotel-text font-light leading-none">
                      {price}
                    </span>
                    <span className="font-inter text-[11px] text-hotel-text-tertiary ml-1.5">
                      {exp.priceLabel[lang]}
                    </span>
                  </div>
                  <div className="text-right">
                    <span className="font-inter text-[10px] uppercase tracking-wider text-hotel-text-tertiary block mb-0.5">
                      {t('duration')}
                    </span>
                    <span className="font-inter text-[0.8rem] text-hotel-text-secondary">
                      {exp.duration[lang]}
                    </span>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* CTA */}
        <motion.div {...fadeUp(0.35)} className="text-center">
          <Link
            href={`${prefix}/experiencias`}
            className="btn-hotel-outline inline-flex items-center gap-2"
          >
            {t('cta')}
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </motion.div>

      </div>
    </section>
  );
}
