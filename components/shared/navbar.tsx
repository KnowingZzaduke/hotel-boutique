'use client';

import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { useEffect, useState } from 'react';
import { Menu, X, Phone, MessageCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { LanguageToggle } from './language-toggle';
import { ThemeToggle } from './theme-toggle';
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetClose,
} from '@/components/ui/sheet';

const WHATSAPP_URL =
  'https://wa.me/573052345678?text=Hola%2C%20me%20gustar%C3%ADa%20reservar%20en%20Casa%20Boutique%20San%20Diego.';

export function Navbar() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  const prefix = locale === 'en' ? '/en' : '';

  const navLinks = [
    { href: `${prefix}/habitaciones`, label: t('rooms') },
    { href: `${prefix}/restaurante`, label: t('restaurant') },
    { href: `${prefix}/experiencias`, label: t('experiences') },
    { href: `${prefix}/galeria`, label: t('gallery') },
    { href: `${prefix}/nosotros`, label: t('about') },
    { href: `${prefix}/contacto`, label: t('contact') },
  ];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header
      className={cn(
        'fixed top-0 left-0 right-0 z-50 transition-all duration-500',
        scrolled
          ? 'bg-hotel-surface/95 backdrop-blur-md shadow-hotel border-b border-hotel-border'
          : 'bg-transparent'
      )}
      style={{ height: 'var(--navbar-height)' }}
    >
      <div className="section-container h-full flex items-center justify-between gap-6">

        {/* Logo */}
        <Link
          href={prefix || '/'}
          aria-label="Casa Boutique San Diego — inicio"
          className="flex-shrink-0"
        >
          <div className="flex flex-col leading-none">
            <span
              className={cn(
                'font-cormorant font-medium tracking-wide transition-colors duration-300 text-[1.35rem]',
                scrolled ? 'text-hotel-text' : 'text-white'
              )}
            >
              Casa Boutique
            </span>
            <span
              className={cn(
                'font-cormorant font-light tracking-[0.18em] text-[0.75rem] uppercase transition-colors duration-300',
                scrolled ? 'text-hotel-gold' : 'text-hotel-gold-light'
              )}
            >
              San Diego
            </span>
            <span
              className={cn(
                'font-inter text-[0.6rem] tracking-[0.2em] uppercase transition-colors duration-300 mt-0.5',
                scrolled ? 'text-hotel-text-tertiary' : 'text-white/60'
              )}
            >
              {t('location')}
            </span>
          </div>
        </Link>

        {/* Nav links — desktop */}
        <nav
          className="hidden lg:flex items-center gap-0.5"
          aria-label="Navegación principal"
        >
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={cn(
                'font-inter text-[0.78rem] font-medium tracking-wider uppercase px-3 py-1.5 rounded-sm',
                'transition-all duration-200 relative group',
                scrolled
                  ? 'text-hotel-text-secondary hover:text-hotel-primary'
                  : 'text-white/80 hover:text-white'
              )}
            >
              {label}
              <span
                className={cn(
                  'absolute bottom-0 left-3 right-3 h-px transition-transform duration-300 origin-left scale-x-0 group-hover:scale-x-100',
                  scrolled ? 'bg-hotel-gold' : 'bg-white/60'
                )}
              />
            </Link>
          ))}
        </nav>

        {/* Right controls — desktop */}
        <div className="hidden lg:flex items-center gap-2">
          <LanguageToggle variant={scrolled ? 'default' : 'light'} />
          <ThemeToggle variant={scrolled ? 'default' : 'light'} />

          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={t('bookWhatsapp')}
            className={cn(
              'flex items-center gap-1.5 font-inter text-xs font-medium tracking-wide px-4 py-2 rounded-sm transition-all duration-300',
              scrolled
                ? 'text-hotel-text-secondary border border-hotel-border hover:border-hotel-gold hover:text-hotel-primary'
                : 'text-white/80 border border-white/25 hover:border-white/60 hover:text-white'
            )}
          >
            <MessageCircle size={13} strokeWidth={1.5} />
            WhatsApp
          </a>

          <Link
            href={`${prefix}/reservar`}
            className={cn(
              'flex items-center gap-1.5 font-inter text-xs font-semibold tracking-widest uppercase px-5 py-2.5 rounded-sm transition-all duration-300',
              scrolled
                ? 'bg-hotel-primary text-white hover:bg-hotel-deep shadow-hotel'
                : 'bg-transparent text-white border border-hotel-gold/70 hover:bg-hotel-primary hover:border-hotel-primary'
            )}
          >
            {t('book')}
          </Link>
        </div>

        {/* Mobile controls */}
        <div className="flex lg:hidden items-center gap-2">
          <LanguageToggle variant={scrolled ? 'default' : 'light'} />
          <ThemeToggle variant={scrolled ? 'default' : 'light'} />

          <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
            {/* Base UI Sheet uses render prop, not asChild */}
            <SheetTrigger
              aria-label="Abrir menú"
              className={cn(
                'flex items-center justify-center w-9 h-9 rounded-sm transition-colors duration-200',
                scrolled
                  ? 'text-hotel-text hover:text-hotel-primary'
                  : 'text-white hover:text-white/80'
              )}
            >
              <Menu size={22} strokeWidth={1.5} />
            </SheetTrigger>

            <SheetContent
              side="right"
              showCloseButton={false}
              className="w-full sm:w-[380px] bg-hotel-surface border-l border-hotel-border p-0 flex flex-col"
            >
              {/* Mobile menu header */}
              <div className="flex items-center justify-between px-8 py-6 border-b border-hotel-border">
                <div className="flex flex-col leading-none">
                  <span className="font-cormorant font-medium text-xl text-hotel-text">
                    Casa Boutique
                  </span>
                  <span className="font-cormorant font-light text-xs tracking-[0.2em] uppercase text-hotel-gold mt-0.5">
                    San Diego
                  </span>
                </div>
                <SheetClose
                  aria-label="Cerrar menú"
                  className="flex items-center justify-center w-8 h-8 text-hotel-text-secondary hover:text-hotel-primary transition-colors"
                >
                  <X size={20} strokeWidth={1.5} />
                </SheetClose>
              </div>

              {/* Mobile nav links */}
              <nav className="flex-1 px-8 py-8 flex flex-col gap-1" aria-label="Menú móvil">
                {navLinks.map(({ href, label }) => (
                  <SheetClose
                    key={href}
                    render={
                      <Link
                        href={href}
                        className="font-inter text-base font-medium tracking-wide text-hotel-text-secondary hover:text-hotel-primary py-3 border-b border-hotel-border/50 transition-colors duration-200 flex items-center justify-between group"
                      >
                        {label}
                        <span className="text-hotel-gold/0 group-hover:text-hotel-gold transition-colors text-lg font-light">
                          →
                        </span>
                      </Link>
                    }
                  />
                ))}
              </nav>

              {/* Mobile CTAs */}
              <div className="px-8 py-8 flex flex-col gap-3 border-t border-hotel-border">
                <Link
                  href={`${prefix}/reservar`}
                  onClick={() => setMobileOpen(false)}
                  className="btn-hotel-primary justify-center text-sm tracking-widest uppercase"
                >
                  {t('book')}
                </Link>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn-hotel-outline justify-center text-sm"
                >
                  <MessageCircle size={15} strokeWidth={1.5} />
                  WhatsApp
                </a>
                <a
                  href="tel:+573052345678"
                  className="flex items-center justify-center gap-2 font-inter text-sm text-hotel-text-secondary hover:text-hotel-primary transition-colors py-2"
                >
                  <Phone size={14} strokeWidth={1.5} />
                  +57 305 234 5678
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
