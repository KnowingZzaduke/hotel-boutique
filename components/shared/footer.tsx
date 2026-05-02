import Link from 'next/link';
import { getTranslations, getLocale } from 'next-intl/server';
import { MapPin, Phone, Mail, MessageCircle } from 'lucide-react';

const WHATSAPP_URL =
  'https://wa.me/573052345678?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20en%20Casa%20Boutique%20San%20Diego.';

export async function Footer() {
  const [t, locale] = await Promise.all([
    getTranslations('footer'),
    getLocale(),
  ]);

  const prefix = locale === 'en' ? '/en' : '';

  const hotelLinks = [
    { href: `${prefix}/habitaciones`, label: t('links.rooms') },
    { href: `${prefix}/restaurante`, label: t('links.restaurant') },
    { href: `${prefix}/experiencias`, label: t('links.experiences') },
    { href: `${prefix}/galeria`, label: t('links.gallery') },
  ];

  const infoLinks = [
    { href: `${prefix}/politica-cancelacion`, label: t('links.cancellation') },
    { href: `${prefix}/terminos`, label: t('links.terms') },
    { href: `${prefix}/privacidad`, label: t('links.privacy') },
    { href: `${prefix}/politica-ninos`, label: t('links.children') },
  ];

  return (
    <footer className="bg-hotel-deep text-hotel-dark-text">

      {/* Main footer grid */}
      <div className="section-container py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-12">

          {/* Brand column */}
          <div className="lg:col-span-1">
            <div className="mb-5">
              <p className="font-cormorant font-medium text-2xl text-white leading-none">
                Casa Boutique
              </p>
              <p className="font-cormorant font-light text-sm tracking-[0.22em] uppercase text-hotel-gold mt-0.5">
                San Diego
              </p>
            </div>
            <p className="font-inter text-sm text-white/50 leading-relaxed mb-6">
              {t('tagline')}
            </p>
            <div className="flex items-center gap-3">
              {[
                { href: '#', label: 'Instagram', abbr: 'IG' },
                { href: '#', label: 'Facebook', abbr: 'FB' },
              ].map(({ href, label, abbr }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="flex items-center justify-center w-9 h-9 border border-white/15 rounded-sm text-white/40 hover:text-hotel-gold hover:border-hotel-gold/40 transition-all duration-300 font-inter text-[10px] font-semibold tracking-wider"
                >
                  {abbr}
                </a>
              ))}
              <a
                href="https://www.tripadvisor.com"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TripAdvisor"
                className="flex items-center justify-center w-9 h-9 border border-white/15 rounded-sm text-white/50 hover:text-hotel-gold hover:border-hotel-gold/40 transition-all duration-300 font-inter text-[10px] font-bold"
              >
                TA
              </a>
            </div>
          </div>

          {/* Hotel links */}
          <div>
            <h3 className="text-pretitle text-white/50 mb-5">{t('hotel')}</h3>
            <ul className="space-y-2.5">
              {hotelLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-inter text-sm text-white/50 hover:text-hotel-gold transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Info links */}
          <div>
            <h3 className="text-pretitle text-white/50 mb-5">{t('info')}</h3>
            <ul className="space-y-2.5">
              {infoLinks.map(({ href, label }) => (
                <li key={href}>
                  <Link
                    href={href}
                    className="font-inter text-sm text-white/50 hover:text-hotel-gold transition-colors duration-200"
                  >
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-pretitle text-white/50 mb-5">{t('contact')}</h3>
            <ul className="space-y-3.5">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} strokeWidth={1.5} className="text-hotel-gold mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-inter text-sm text-white/50 leading-snug">{t('address')}</p>
                  <p className="font-inter text-sm text-white/50 leading-snug">{t('district')}</p>
                  <p className="font-inter text-sm text-white/50 leading-snug">{t('city')}</p>
                </div>
              </li>
              <li>
                <a
                  href="tel:+573052345678"
                  className="flex items-center gap-2.5 font-inter text-sm text-white/50 hover:text-hotel-gold transition-colors duration-200"
                >
                  <Phone size={13} strokeWidth={1.5} className="text-hotel-gold flex-shrink-0" />
                  +57 305 234 5678
                </a>
              </li>
              <li>
                <a
                  href="mailto:reservas@casaboutiquesandiego.com"
                  className="flex items-center gap-2.5 font-inter text-sm text-white/50 hover:text-hotel-gold transition-colors duration-200 break-all"
                >
                  <Mail size={13} strokeWidth={1.5} className="text-hotel-gold flex-shrink-0" />
                  reservas@casaboutiquesandiego.com
                </a>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2.5 font-inter text-sm text-white/50 hover:text-hotel-gold transition-colors duration-200"
                >
                  <MessageCircle size={13} strokeWidth={1.5} className="text-hotel-gold flex-shrink-0" />
                  WhatsApp
                </a>
              </li>
              <li>
                <p className="font-inter text-xs text-white/30 tracking-wide">{t('reception')}</p>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Certifications bar */}
      <div className="border-t border-white/8">
        <div className="section-container py-5 flex flex-wrap items-center justify-center gap-4">
          {["Travelers' Choice 2025", "Boutique Hotel of the Year 2024", "Condé Nast Recommended"].map(
            (cert) => (
              <span
                key={cert}
                className="font-inter text-xs text-white/30 tracking-wide border border-white/10 px-3 py-1 rounded-sm"
              >
                {cert}
              </span>
            )
          )}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/8">
        <div className="section-container py-5 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-inter text-xs text-white/30 text-center sm:text-left">
            {t('copyright')}
          </p>
          <p className="font-inter text-xs text-white/25 text-center sm:text-right">
            {t('credit')}{' '}
            <a
              href="https://joseluisarteta.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-hotel-gold/50 hover:text-hotel-gold transition-colors"
            >
              José Luis Arteta
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
