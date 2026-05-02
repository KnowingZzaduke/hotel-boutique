'use client';

import { useTranslations } from 'next-intl';
import { motion } from 'framer-motion';
import {
  Utensils,
  Waves,
  Sparkles,
  Sun,
  Bell,
  Car,
  Heart,
  Compass,
  type LucideIcon,
} from 'lucide-react';

const SERVICES: { key: string; Icon: LucideIcon }[] = [
  { key: 'restaurant', Icon: Utensils },
  { key: 'pool',       Icon: Waves    },
  { key: 'spa',        Icon: Sparkles },
  { key: 'terrace',    Icon: Sun      },
  { key: 'concierge',  Icon: Bell     },
  { key: 'transfers',  Icon: Car      },
  { key: 'events',     Icon: Heart    },
  { key: 'tours',      Icon: Compass  },
];

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' } as const,
    transition: {
      duration: 0.65,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  };
}

export function ExperienciaServicios() {
  const t = useTranslations('services');

  return (
    <section className="bg-hotel-bg py-24 lg:py-32">
      <div className="section-container">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-16 lg:mb-20">
          <p className="text-pretitle text-hotel-gold mb-3">{t('pretitle')}</p>
          <div className="gold-divider mx-auto mb-5" />
          <h2 className="text-h2 text-hotel-text">{t('title')}</h2>
        </motion.div>

        {/* Window-pane grid: 1px gaps as dividers */}
        <div
          className="grid grid-cols-2 md:grid-cols-4"
          style={{ gap: '1px', backgroundColor: 'var(--hotel-border)' }}
        >
          {SERVICES.map(({ key, Icon }, i) => {
            const row = Math.floor(i / 4);
            const col = i % 4;
            return (
              <motion.div
                key={key}
                {...fadeUp(row * 0.1 + col * 0.06)}
                className="bg-hotel-bg p-8 lg:p-10 group"
              >
                <div className="mb-4 inline-flex items-center justify-center w-11 h-11 rounded-full bg-hotel-primary/10 group-hover:bg-hotel-primary/18 transition-colors duration-300">
                  <Icon size={20} className="text-hotel-primary" strokeWidth={1.5} />
                </div>
                <h3 className="font-playfair text-[1rem] font-semibold text-hotel-text mb-2 leading-snug">
                  {t(`${key}.title`)}
                </h3>
                <p className="font-inter text-sm text-hotel-text-secondary leading-relaxed">
                  {t(`${key}.desc`)}
                </p>
              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
