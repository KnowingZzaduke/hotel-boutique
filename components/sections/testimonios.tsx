'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { useTranslations, useLocale } from 'next-intl';
import { motion } from 'framer-motion';
import { Star, ChevronLeft, ChevronRight, Quote } from 'lucide-react';
import useEmblaCarousel from 'embla-carousel-react';
import { TESTIMONIALS } from '@/lib/testimonials-data';
import { cn } from '@/lib/utils';

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <Star
          key={i}
          size={13}
          className={i < rating ? 'text-hotel-gold fill-hotel-gold' : 'text-hotel-text-tertiary'}
          strokeWidth={1}
        />
      ))}
    </div>
  );
}

function PlatformBadge({ platform }: { platform: string }) {
  const colors: Record<string, string> = {
    'Google':      'bg-[#4285F4]/10 text-[#4285F4]',
    'TripAdvisor': 'bg-[#34E0A1]/10 text-[#2BB17A]',
    'Booking.com': 'bg-[#003580]/10 text-[#003580]',
  };
  return (
    <span className={cn('font-inter text-[10px] font-medium px-2 py-0.5 rounded-sm', colors[platform] ?? 'bg-hotel-gold/10 text-hotel-gold')}>
      {platform}
    </span>
  );
}

function fadeUp(delay = 0) {
  return {
    initial: { opacity: 0, y: 24 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: '-60px' } as const,
    transition: { duration: 0.75, ease: [0.22, 1, 0.36, 1] as [number, number, number, number], delay },
  };
}

export function Testimonios() {
  const t = useTranslations('testimonios');
  const locale = useLocale();
  const lang = locale === 'en' ? 'en' : 'es';

  const [emblaRef, emblaApi] = useEmblaCarousel({
    loop: true,
    align: 'start',
    slidesToScroll: 1,
    breakpoints: { '(min-width: 768px)': { slidesToScroll: 1 } },
  });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(true);

  const scrollPrev = useCallback(() => emblaApi?.scrollPrev(), [emblaApi]);
  const scrollNext = useCallback(() => emblaApi?.scrollNext(), [emblaApi]);
  const scrollTo   = useCallback((i: number) => emblaApi?.scrollTo(i), [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;
    const onSelect = () => {
      setSelectedIndex(emblaApi.selectedScrollSnap());
      setCanScrollPrev(emblaApi.canScrollPrev());
      setCanScrollNext(emblaApi.canScrollNext());
    };
    emblaApi.on('select', onSelect);
    emblaApi.on('reInit', onSelect);
    onSelect();
    return () => { emblaApi.off('select', onSelect); emblaApi.off('reInit', onSelect); };
  }, [emblaApi]);

  return (
    <section className="bg-hotel-surface-alt py-24 lg:py-32 overflow-hidden">
      <div className="section-container">

        {/* Header */}
        <motion.div {...fadeUp(0)} className="text-center mb-14 lg:mb-20">
          <p className="text-pretitle text-hotel-gold mb-3">{t('pretitle')}</p>
          <div className="gold-divider mx-auto mb-5" />
          <h2 className="text-h2 text-hotel-text">{t('title')}</h2>
        </motion.div>

        {/* Carousel */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true, margin: '-40px' }}
          transition={{ duration: 0.6 }}
        >
          <div className="overflow-hidden" ref={emblaRef}>
            <div className="flex -ml-5">
              {TESTIMONIALS.map((t_) => (
                <div key={t_.id} className="flex-none w-full md:w-1/2 lg:w-1/3 pl-5">
                  <div className="bg-hotel-surface shadow-hotel h-full p-8 flex flex-col">

                    {/* Quote icon + stars */}
                    <div className="flex items-start justify-between mb-5">
                      <Quote size={28} className="text-hotel-gold/30" strokeWidth={1} />
                      <StarRating rating={t_.rating} />
                    </div>

                    {/* Text */}
                    <p className="font-inter text-[0.9rem] leading-[1.75] text-hotel-text-secondary flex-1 mb-6">
                      &ldquo;{t_.text[lang]}&rdquo;
                    </p>

                    <div className="gold-divider mb-5" />

                    {/* Author */}
                    <div className="flex items-center gap-3">
                      <div className="relative w-10 h-10 rounded-full overflow-hidden shrink-0 ring-1 ring-hotel-gold/20">
                        <Image
                          src={t_.avatarUrl}
                          alt={t_.name}
                          fill
                          className="object-cover"
                          sizes="40px"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-inter font-medium text-[0.875rem] text-hotel-text leading-none mb-1">
                          {t_.name}
                        </p>
                        <p className="font-inter text-[0.75rem] text-hotel-text-tertiary leading-none truncate">
                          {t_.origin[lang]}
                        </p>
                      </div>
                      <PlatformBadge platform={t_.platform} />
                    </div>

                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Controls */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button
              onClick={scrollPrev}
              disabled={!canScrollPrev}
              aria-label="Anterior"
              className="w-10 h-10 rounded-full border border-hotel-gold/40 flex items-center justify-center text-hotel-primary transition-all duration-300 hover:bg-hotel-primary hover:text-white hover:border-hotel-primary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft size={16} strokeWidth={1.5} />
            </button>

            {/* Dots */}
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => scrollTo(i)}
                  aria-label={`Ir a testimonio ${i + 1}`}
                  className={cn(
                    'rounded-full transition-all duration-300',
                    i === selectedIndex
                      ? 'w-5 h-1.5 bg-hotel-gold'
                      : 'w-1.5 h-1.5 bg-hotel-text-tertiary/40 hover:bg-hotel-gold/50'
                  )}
                />
              ))}
            </div>

            <button
              onClick={scrollNext}
              disabled={!canScrollNext}
              aria-label="Siguiente"
              className="w-10 h-10 rounded-full border border-hotel-gold/40 flex items-center justify-center text-hotel-primary transition-all duration-300 hover:bg-hotel-primary hover:text-white hover:border-hotel-primary disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight size={16} strokeWidth={1.5} />
            </button>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
