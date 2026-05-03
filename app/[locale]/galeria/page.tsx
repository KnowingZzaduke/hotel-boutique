'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';
import { useLocale } from 'next-intl';
import { ZoomIn } from 'lucide-react';
import Lightbox from 'yet-another-react-lightbox';
import 'yet-another-react-lightbox/styles.css';
import { GALLERY_IMAGES, GALLERY_CATEGORIES } from '@/lib/gallery-data';
import type { GalleryCategory } from '@/lib/gallery-data';
import { cn } from '@/lib/utils';

export default function GaleriaPage() {
  const locale = useLocale();
  const isEs = locale === 'es';
  const lang: 'es' | 'en' = isEs ? 'es' : 'en';

  const [activeCategory, setActiveCategory] = useState<GalleryCategory>('all');
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);

  const filtered = activeCategory === 'all'
    ? GALLERY_IMAGES
    : GALLERY_IMAGES.filter((img) => img.category === activeCategory);

  const slides = filtered.map((img) => ({ src: img.url }));

  const openAt = useCallback((i: number) => {
    setLightboxIndex(i);
    setLightboxOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-hotel-bg">

      {/* Header */}
      <div className="pt-32 pb-14 bg-hotel-surface-alt">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <p className="text-pretitle text-hotel-gold mb-3">{isEs ? 'Galería' : 'Gallery'}</p>
          <div className="gold-divider mb-6" />
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] text-hotel-text leading-tight">
            {isEs ? 'Una imagen por cada historia' : 'An image for every story'}
          </h1>
        </div>
      </div>

      {/* Category filter */}
      <div className="sticky top-16 z-20 bg-hotel-bg/95 backdrop-blur-sm border-b border-hotel-text/8">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="flex gap-1 overflow-x-auto py-4 scrollbar-hide">
            {GALLERY_CATEGORIES.map((cat) => (
              <button
                key={cat.value}
                onClick={() => setActiveCategory(cat.value)}
                className={cn(
                  'font-inter text-[11px] uppercase tracking-[0.16em] px-5 py-2.5 rounded-sm whitespace-nowrap transition-all duration-200 shrink-0',
                  activeCategory === cat.value
                    ? 'bg-hotel-primary text-white'
                    : 'text-hotel-text-secondary hover:text-hotel-text hover:bg-hotel-surface-alt'
                )}
              >
                {cat.label[lang]}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Gallery grid */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-12 lg:py-16">
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
          {filtered.map((img, i) => (
            <button
              key={img.id}
              onClick={() => openAt(i)}
              aria-label={img.alt[lang]}
              className={cn(
                'relative overflow-hidden group aspect-square focus-visible:outline-hotel-gold focus-visible:outline-2 focus-visible:outline-offset-2',
                i === 0 && 'col-span-2 row-span-2 aspect-auto'
              )}
            >
              <Image
                src={img.url}
                alt={img.alt[lang]}
                fill
                quality={80}
                className="object-cover transition-transform duration-600 group-hover:scale-105"
                sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />
              <div className="absolute inset-0 bg-hotel-deep/0 group-hover:bg-hotel-deep/40 transition-colors duration-300 flex flex-col items-center justify-center gap-2">
                <ZoomIn size={20} className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" strokeWidth={1.5} />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-3 bg-gradient-to-t from-hotel-deep/70 to-transparent translate-y-full group-hover:translate-y-0 transition-transform duration-300">
                <p className="font-inter text-[0.7rem] text-white/80 leading-tight line-clamp-2">
                  {img.alt[lang]}
                </p>
              </div>
            </button>
          ))}
        </div>

        {filtered.length === 0 && (
          <div className="text-center py-20">
            <p className="font-cormorant italic text-[1.25rem] text-hotel-text-secondary">
              {isEs ? 'No hay imágenes en esta categoría.' : 'No images in this category.'}
            </p>
          </div>
        )}
      </div>

      <Lightbox
        open={lightboxOpen}
        close={() => setLightboxOpen(false)}
        index={lightboxIndex}
        slides={slides}
        on={{ view: ({ index }) => setLightboxIndex(index) }}
        styles={{ root: { '--yarl__color_backdrop': 'rgba(26, 22, 18, 0.97)' } }}
      />
    </div>
  );
}
