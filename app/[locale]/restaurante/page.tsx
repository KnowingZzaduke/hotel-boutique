import type { Metadata } from 'next';
import Image from 'next/image';
import { getLocale } from 'next-intl/server';
import { Clock, Users } from 'lucide-react';
import { MENU_SECTIONS, RESTAURANT_GALLERY } from '@/lib/restaurant-data';
import { JsonLd } from '@/components/shared/json-ld';
import { restaurantSchema, breadcrumbSchema } from '@/lib/schema';
import { BLUR_DEEP } from '@/lib/blur-placeholder';

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const isEs = locale === 'es';
  return {
    title: isEs ? 'Restaurante El Patio de las Bóvedas' : 'El Patio de las Bóvedas Restaurant',
    description: isEs
      ? 'Cocina caribeña contemporánea en el corazón de la casa colonial. Menú degustación de 7 tiempos y carta de autor con productos locales del Caribe colombiano.'
      : 'Contemporary Caribbean cuisine at the heart of the colonial house. 7-course tasting menu and signature à la carte with local Colombian Caribbean produce.',
  };
}

export default async function RestaurantePage() {
  const locale = await getLocale();
  const isEs = locale === 'es';
  const lang: 'es' | 'en' = isEs ? 'es' : 'en';

  return (
    <div className="min-h-screen bg-hotel-bg">
      <JsonLd data={[
        restaurantSchema(locale),
        breadcrumbSchema([
          { name: isEs ? 'Inicio' : 'Home',       url: isEs ? '/' : '/en'              },
          { name: isEs ? 'Restaurante' : 'Restaurant', url: isEs ? '/restaurante' : '/en/restaurante' },
        ]),
      ]} />

      {/* Hero */}
      <div className="relative h-[60vh] min-h-[420px] overflow-hidden">
        <Image
          src={RESTAURANT_GALLERY[0].url}
          alt={RESTAURANT_GALLERY[0].alt[lang]}
          fill
          quality={88}
          placeholder="blur"
          blurDataURL={BLUR_DEEP}
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-hotel-deep/85 via-hotel-deep/30 to-transparent" />
        <div className="absolute bottom-12 left-0 right-0 px-6 lg:px-12">
          <div className="max-w-screen-xl mx-auto">
            <p className="font-cormorant italic text-hotel-gold text-[1.1rem] mb-2">
              {isEs ? 'Cocina de autor' : 'Signature cuisine'}
            </p>
            <h1 className="font-playfair text-[2.5rem] lg:text-[3.5rem] text-white leading-tight">
              El Patio de las Bóvedas
            </h1>
          </div>
        </div>
      </div>

      {/* Info bar */}
      <div className="bg-hotel-deep border-b border-white/8">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 py-5 flex flex-wrap gap-8">
          {[
            { Icon: Clock, value: '7:00 am — 10:30 pm', label: isEs ? 'Horario' : 'Hours' },
            { Icon: Users, value: isEs ? 'Huéspedes y público general' : 'Guests and general public', label: isEs ? 'Acceso' : 'Access' },
          ].map(({ Icon, value, label }) => (
            <div key={label} className="flex items-center gap-3">
              <Icon size={15} strokeWidth={1.5} className="text-hotel-gold" />
              <div>
                <p className="font-inter text-[10px] uppercase tracking-[0.14em] text-white/40">{label}</p>
                <p className="font-inter text-[0.85rem] text-white/80">{value}</p>
              </div>
            </div>
          ))}
          <div className="ml-auto hidden lg:flex items-center">
            <a
              href="https://wa.me/573052345678?text=Hola%2C%20quisiera%20reservar%20una%20mesa%20en%20El%20Patio%20de%20las%20B%C3%B3vedas."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-hotel-gold/40 text-hotel-gold font-inter font-medium text-sm tracking-wide px-6 py-2.5 rounded-sm transition-all duration-300 hover:bg-hotel-gold hover:text-hotel-deep"
            >
              {isEs ? 'Reservar mesa' : 'Reserve a table'}
            </a>
          </div>
        </div>
      </div>

      {/* Intro */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <div className="max-w-2xl">
          <p className="text-pretitle text-hotel-gold mb-3">{isEs ? 'El restaurante' : 'The restaurant'}</p>
          <div className="gold-divider mb-6" />
          <h2 className="font-playfair text-[2rem] lg:text-[2.5rem] text-hotel-text mb-6 leading-tight">
            {isEs ? 'Cocina caribeña con alma de autor' : 'Caribbean cuisine with a chef\'s soul'}
          </h2>
          <div className="space-y-4">
            <p className="font-inter text-[0.9375rem] leading-[1.8] text-hotel-text-secondary">
              {isEs
                ? 'En el corazón de la casa colonial, nuestro restaurante es donde el Caribe colombiano se convierte en alta cocina. Productos del mercado de Bazurto, recetas de la abuela Aristizábal y la técnica de quien aprendió en las mejores cocinas del país.'
                : 'At the heart of the colonial house, our restaurant is where the Colombian Caribbean becomes fine dining. Ingredients from Bazurto market, Aristizábal family recipes and the technique of someone who trained in the country\'s finest kitchens.'}
            </p>
            <p className="font-inter text-[0.9375rem] leading-[1.8] text-hotel-text-secondary">
              {isEs
                ? 'Cada plato del menú degustación es un viaje por los sabores del litoral: el ceviche de camarones del Golfo, el mote de queso de Mompox, la torta de plátano maduro con helado de coco artesanal.'
                : 'Each dish in the tasting menu is a journey through coastal flavors: Gulf shrimp ceviche, Mompox cheese mote, ripe plantain cake with artisan coconut ice cream.'}
            </p>
          </div>
        </div>
      </section>

      {/* Menu sections */}
      <section className="bg-hotel-surface-alt py-16 lg:py-20">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12">
          <div className="text-center mb-14">
            <p className="text-pretitle text-hotel-gold mb-3">{isEs ? 'Nuestra carta' : 'Our menu'}</p>
            <div className="gold-divider mx-auto mb-5" />
            <h2 className="font-playfair text-[2rem] lg:text-[2.5rem] text-hotel-text">
              {isEs ? 'Sabores del Caribe colombiano' : 'Flavors of the Colombian Caribbean'}
            </h2>
          </div>

          <div className="space-y-14">
            {MENU_SECTIONS.map((section) => (
              <div key={section.id}>
                <div className="flex flex-wrap items-baseline gap-4 mb-8 pb-4 border-b border-hotel-text/10">
                  <h3 className="font-playfair text-[1.5rem] text-hotel-text">{section.title[lang]}</h3>
                  <span className="font-inter text-[0.8rem] text-hotel-text-tertiary">{section.schedule[lang]}</span>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  {section.items.map((item, i) => (
                    <div key={i} className="bg-hotel-surface p-6 shadow-hotel">
                      <div className="flex items-start justify-between gap-4 mb-2">
                        <h4 className="font-playfair text-[1.05rem] text-hotel-text leading-snug">
                          {item.name[lang]}
                        </h4>
                        <span className="font-cormorant text-[1.1rem] text-hotel-primary font-light shrink-0">
                          {item.price}
                        </span>
                      </div>
                      {item.tag && (
                        <span className="inline-block font-inter text-[10px] uppercase tracking-[0.14em] bg-hotel-gold/10 text-hotel-gold px-2 py-0.5 mb-2">
                          {item.tag[lang]}
                        </span>
                      )}
                      <p className="font-inter text-[0.8125rem] text-hotel-text-secondary leading-relaxed">
                        {item.desc[lang]}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="max-w-screen-xl mx-auto px-6 lg:px-12 py-16 lg:py-20">
        <h2 className="font-playfair text-[1.75rem] text-hotel-text mb-8">
          {isEs ? 'El espacio' : 'The space'}
        </h2>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
          {RESTAURANT_GALLERY.map((img, i) => (
            <div key={img.url} className={`relative overflow-hidden ${i === 0 ? 'col-span-2 aspect-[2/1]' : 'aspect-square'}`}>
              <Image
                src={img.url}
                alt={img.alt[lang]}
                fill
                quality={80}
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <div className="bg-hotel-deep py-16">
        <div className="max-w-screen-xl mx-auto px-6 lg:px-12 text-center">
          <h2 className="font-playfair text-[2rem] text-white mb-4">
            {isEs ? '¿Listo para reservar tu mesa?' : 'Ready to reserve your table?'}
          </h2>
          <p className="font-cormorant italic text-white/60 text-[1.15rem] mb-8">
            {isEs ? 'Para el menú degustación se requiere reserva previa.' : 'Advance reservation required for the tasting menu.'}
          </p>
          <a
            href="https://wa.me/573052345678?text=Hola%2C%20quisiera%20reservar%20una%20mesa%20en%20El%20Patio%20de%20las%20B%C3%B3vedas."
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-hotel-gold text-hotel-deep font-inter font-semibold text-sm tracking-wide px-8 py-4 rounded-sm transition-all duration-300 hover:bg-[#D4B47C]"
          >
            {isEs ? 'Reservar por WhatsApp' : 'Reserve via WhatsApp'}
          </a>
        </div>
      </div>

    </div>
  );
}
