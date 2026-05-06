'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { ArrowRight, ZoomIn } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { cn } from '@/lib/utils';

interface GalleryImage {
  id: string;
  src: string;
  captionKey: string;
  captionEs: string;
  captionEn: string;
}

const GALLERY_IMAGES: GalleryImage[] = [
  {
    id: 'pool',
    src: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=85&auto=format&fit=crop',
    captionKey: 'pool',
    captionEs: 'Piscina colonial rodeada de palmeras centenarias',
    captionEn: 'Colonial pool surrounded by century-old palms',
  },
  {
    id: 'restaurant',
    src: 'https://images.unsplash.com/photo-1537047902294-62a40c20a6ae?w=900&q=85&auto=format&fit=crop',
    captionKey: 'restaurant',
    captionEs: 'El Patio de las Bóvedas, restaurante de autor',
    captionEn: 'El Patio de las Bóvedas, signature restaurant',
  },
  {
    id: 'facade',
    src: 'https://images.unsplash.com/photo-1590725121839-892b458a74fe?w=900&q=85&auto=format&fit=crop',
    captionKey: 'facade',
    captionEs: 'Fachada colonial restaurada del siglo XVIII',
    captionEn: 'Restored 18th-century colonial facade',
  },
  {
    id: 'room',
    src: 'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=900&q=85&auto=format&fit=crop',
    captionKey: 'room',
    captionEs: 'Suite Mirador con terraza privada',
    captionEn: 'Mirador Suite with private terrace',
  },
  {
    id: 'spa',
    src: 'https://images.unsplash.com/photo-1540555700478-4be289fbecef?w=900&q=85&auto=format&fit=crop',
    captionKey: 'spa',
    captionEs: 'Sala de tratamientos Spa & Bienestar',
    captionEn: 'Spa & Wellness treatment room',
  },
  {
    id: 'rooftop',
    src: 'https://images.unsplash.com/photo-1527529482837-4698179dc6ce?w=900&q=85&auto=format&fit=crop',
    captionKey: 'rooftop',
    captionEs: 'Terraza con bar y vista a las murallas',
    captionEn: 'Rooftop bar with views of the city walls',
  },
  {
    id: 'street',
    src: 'https://images.unsplash.com/photo-1583212292454-1fe6229603b7?w=900&q=85&auto=format&fit=crop',
    captionKey: 'street',
    captionEs: 'Calles empedradas del barrio San Diego',
    captionEn: 'Cobblestone streets of San Diego neighborhood',
  },
  {
    id: 'cocktails',
    src: 'https://images.unsplash.com/photo-1481931098730-318b6f776db0?w=900&q=85&auto=format&fit=crop',
    captionKey: 'cocktails',
    captionEs: 'Carta de cócteles caribeños con ingredientes locales',
    captionEn: 'Caribbean cocktail menu with local ingredients',
  },
];

const slides = GALLERY_IMAGES.map((img) => ({ src: img.src }));

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' } as const,
    transition: {
      duration: 0.75,
      ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
      delay,
    },
  };
}

export function Galeria() {
  const t = useTranslations('gallery');
  const locale = useLocale();
  const lang = locale === 'en' ? 'en' : 'es';
  const prefix = locale === 'en' ? '/en' : '';

  const [open, setOpen] = useState(false);
  const [index, setIndex] = useState(0);

  const openAt = useCallback((i: number) => {
    setIndex(i);
    setOpen(true);
  }, []);

  return (
    <section className="bg-hotel-bg py-24 lg:py-32">
      <div className="section-container">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-12 lg:mb-16">
          <p className="text-pretitle text-hotel-gold mb-3">{t('pretitle')}</p>
          <div className="gold-divider mx-auto mb-5" />
          <h2 className="text-h2 text-hotel-text">{t('title')}</h2>
        </motion.div>

        {/* Asymmetric grid — 3 cols desktop, 2 cols mobile */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="grid grid-cols-2 lg:grid-cols-3 lg:auto-rows-[260px] gap-2.5 mb-12"
        >
          {GALLERY_IMAGES.map((img, i) => {
            const alt = lang === 'es' ? img.captionEs : img.captionEn;
            const isFirst = i === 0;

            return (
              <motion.button
                key={img.id}
                initial={{ opacity: 0, scale: 0.97 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: 0.55,
                  ease: [0.22, 1, 0.36, 1],
                  delay: 0.05 + (i % 3) * 0.07,
                }}
                onClick={() => openAt(i)}
                aria-label={alt}
                className={cn(
                  'relative overflow-hidden group aspect-[4/3] lg:aspect-auto focus-visible:outline-hotel-gold focus-visible:outline-2 focus-visible:outline-offset-2',
                  isFirst && 'col-span-2 lg:col-span-1 lg:row-span-2'
                )}
              >
                <Image
                  src={img.src}
                  alt={alt}
                  fill
                  quality={80}
                  className="object-cover transition-transform duration-700 group-hover:scale-105"
                  sizes={
                    isFirst
                      ? '(max-width: 1024px) 100vw, 33vw'
                      : '(max-width: 768px) 50vw, (max-width: 1024px) 50vw, 33vw'
                  }
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-hotel-deep/0 group-hover:bg-hotel-deep/40 transition-colors duration-400 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-10 h-10 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center">
                    <ZoomIn size={16} className="text-white" strokeWidth={1.5} />
                  </div>
                </div>
                {/* Caption on hover */}
                <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-hotel-deep/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-400">
                  <p className="font-inter text-[0.7rem] text-white/80 leading-tight">{alt}</p>
                </div>
              </motion.button>
            );
          })}
        </motion.div>

        {/* CTA */}
        <motion.div {...fadeUp(0.3)} className="text-center">
          <Link
            href={`${prefix}/galeria`}
            className="btn-hotel-outline inline-flex items-center gap-2"
          >
            {t('cta')}
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </motion.div>

      </div>

      {/* Lightbox */}
      <Lightbox
        open={open}
        close={() => setOpen(false)}
        index={index}
        slides={slides}
        on={{ view: ({ index: newIndex }) => setIndex(newIndex) }}
        styles={{ root: { '--yarl__color_backdrop': 'rgba(26, 22, 18, 0.97)' } }}
      />
    </section>
  );
}
