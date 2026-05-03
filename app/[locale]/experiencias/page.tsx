import type { Metadata } from 'next';
import Link from 'next/link';
import { getLocale } from 'next-intl/server';
import { Clock, ArrowRight } from 'lucide-react';
import { EXPERIENCES, formatExperiencePriceCOP } from '@/lib/experiences-data';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Experiencias' : 'Experiences',
    description: isEs
      ? '6 experiencias curadas en Cartagena: tour ciudad amurallada, Islas del Rosario, spa caribeño, clases de cocina, atardecer en velero y mercado de Bazurto.'
      : '6 curated experiences in Cartagena: walled city tour, Rosario Islands, Caribbean spa, cooking classes, sunset sailboat and Bazurto market.',
  };
}

export default async function ExperienciasPage() {
  const locale = await getLocale();
  const isEs = locale === 'es';
  const lang: 'es' | 'en' = isEs ? 'es' : 'en';
  const prefix = isEs ? '' : '/en';

  return (
    <div className="min-h-screen bg-hotel-bg">

      {/* Page header */}
      <div className="pt-32 pb-16 bg-hotel-surface-alt">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <p className="text-pretitle text-hotel-gold mb-3">{isEs ? 'Más allá del hotel' : 'Beyond the hotel'}</p>
          <div className="gold-divider mb-6" />
          <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] text-hotel-text leading-tight mb-4">
            {isEs ? 'Experiencias curadas' : 'Curated experiences'}
          </h1>
          <p className="font-cormorant italic text-[1.25rem] text-hotel-text-secondary max-w-2xl">
            {isEs
              ? 'Cartagena vista desde adentro, diseñada por quienes la conocen de verdad. Cada experiencia es gestionada por nuestro equipo de conserjería y disponible para huéspedes y visitantes.'
              : 'Cartagena seen from within, designed by those who truly know it. Each experience is managed by our concierge team and available to guests and visitors.'}
          </p>
        </div>
      </div>

      {/* Experiences grid */}
      <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {EXPERIENCES.map((exp, i) => {
            const price = isEs ? formatExperiencePriceCOP(exp.priceCOP) : `$${exp.priceUSD} USD`;

            return (
              <article key={exp.id} className="group bg-hotel-surface shadow-hotel hover:shadow-hotel-lg transition-all duration-500 hover:-translate-y-1 flex flex-col">
                <div className="p-8 flex flex-col flex-1">

                  {/* Icon + Number */}
                  <div className="flex items-start justify-between mb-6">
                    <div className="w-12 h-12 rounded-full bg-hotel-primary/10 group-hover:bg-hotel-primary/18 transition-colors duration-300 flex items-center justify-center">
                      <exp.Icon size={20} strokeWidth={1.5} className="text-hotel-primary" />
                    </div>
                    <span className="font-cormorant font-light text-[2.2rem] leading-none text-hotel-gold/25 select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Text */}
                  <h2 className="font-playfair text-[1.2rem] text-hotel-text mb-1 leading-snug">
                    {exp.title[lang]}
                  </h2>
                  <p className="font-cormorant italic text-hotel-gold text-[1rem] leading-snug mb-4">
                    {exp.tagline[lang]}
                  </p>
                  <p className="font-inter text-[0.875rem] text-hotel-text-secondary leading-relaxed mb-6 flex-1">
                    {exp.desc[lang]}
                  </p>

                  {/* Duration + price */}
                  <div className="gold-divider mb-5" />
                  <div className="flex items-center gap-2 text-hotel-text-tertiary mb-4">
                    <Clock size={13} strokeWidth={1.5} />
                    <span className="font-inter text-[0.8rem]">{exp.duration[lang]}</span>
                  </div>
                  <div className="flex items-end justify-between gap-3">
                    <div>
                      <span className="font-inter text-[10px] uppercase tracking-wider text-hotel-text-tertiary block mb-0.5">
                        {isEs ? 'Desde' : 'From'}
                      </span>
                      <span className="font-cormorant text-[1.5rem] text-hotel-text font-light leading-none">
                        {price}
                      </span>
                      <span className="font-inter text-[11px] text-hotel-text-tertiary ml-1.5">
                        {exp.priceLabel[lang]}
                      </span>
                    </div>
                    <a
                      href={`https://wa.me/573052345678?text=${encodeURIComponent(
                        isEs
                          ? `Hola, me gustaría reservar: ${exp.title.es}`
                          : `Hello, I would like to book: ${exp.title.en}`
                      )}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="btn-hotel-ghost flex items-center gap-1 text-[0.8rem] shrink-0"
                    >
                      {isEs ? 'Reservar' : 'Book'}
                      <ArrowRight size={12} strokeWidth={1.5} />
                    </a>
                  </div>
                </div>
              </article>
            );
          })}
        </div>

        {/* Contact CTA */}
        <div className="mt-16 bg-hotel-surface shadow-hotel p-10 text-center">
          <h3 className="font-playfair text-[1.5rem] text-hotel-text mb-3">
            {isEs ? '¿Quieres una experiencia a medida?' : 'Want a tailor-made experience?'}
          </h3>
          <p className="font-inter text-[0.875rem] text-hotel-text-secondary mb-6 max-w-lg mx-auto">
            {isEs
              ? 'Nuestro equipo de conserjería diseña experiencias personalizadas. Escríbenos y creamos juntos tu itinerario perfecto en Cartagena.'
              : 'Our concierge team designs personalized experiences. Write to us and we will create your perfect Cartagena itinerary together.'}
          </p>
          <Link href={`${prefix}/contacto`} className="btn-hotel-outline inline-flex items-center gap-2">
            {isEs ? 'Contactar conserjería' : 'Contact concierge'}
            <ArrowRight size={14} strokeWidth={1.5} />
          </Link>
        </div>
      </div>

    </div>
  );
}
