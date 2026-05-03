import type { Metadata } from 'next';
import { Cormorant_Garamond, Playfair_Display, Inter } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { Providers } from '@/components/shared/providers';
import { Navbar } from '@/components/shared/navbar';
import { Footer } from '@/components/shared/footer';
import { JsonLd } from '@/components/shared/json-ld';
import { hotelSchema } from '@/lib/schema';
import '../globals.css';

const cormorant = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--font-cormorant',
  display: 'swap',
});

const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  style: ['normal', 'italic'],
  variable: '--font-playfair',
  display: 'swap',
});

const inter = Inter({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-inter',
  display: 'swap',
});

const locales = ['es', 'en'];

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({
  params,
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const { locale } = params;
  const isEs = locale === 'es';

  return {
    metadataBase: new URL('https://casaboutiquesandiego.com'),
    title: {
      default: 'Casa Boutique San Diego | Hotel de Lujo en Cartagena',
      template: '%s | Casa Boutique San Diego',
    },
    description: isEs
      ? 'Hotel boutique 5 estrellas en el corazón del Centro Histórico de Cartagena. 12 habitaciones únicas en una casa colonial del siglo XVIII. Piscina, spa, restaurante y terraza con vista a la muralla.'
      : "Luxury 5-star boutique hotel in the heart of Cartagena's Historic Center. 12 unique rooms in an 18th-century colonial house. Pool, spa, restaurant and terrace with city wall views.",
    keywords: isEs
      ? ['hotel boutique cartagena', 'hotel lujo cartagena', 'hotel centro historico cartagena', 'casa boutique san diego']
      : ['boutique hotel cartagena', 'luxury hotel cartagena', 'historic center hotel cartagena'],
    openGraph: {
      type: 'website',
      locale: isEs ? 'es_CO' : 'en_US',
      siteName: 'Casa Boutique San Diego',
      title: 'Casa Boutique San Diego | Cartagena de Indias',
      description: isEs
        ? 'Una casa colonial. Una experiencia inolvidable. Hotel boutique de lujo en el Centro Histórico de Cartagena.'
        : "A colonial house. An unforgettable experience. Luxury boutique hotel in Cartagena's Historic Center.",
      images: [
        {
          url: 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
          width: 1200,
          height: 630,
          alt: 'Casa Boutique San Diego — Cartagena de Indias',
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: 'Casa Boutique San Diego | Cartagena de Indias',
      description: isEs
        ? 'Hotel boutique de lujo en el Centro Histórico de Cartagena.'
        : "Luxury boutique hotel in Cartagena's Historic Center.",
    },
    alternates: {
      canonical: '/',
      languages: { es: '/', en: '/en' },
    },
    robots: { index: true, follow: true },
  };
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  const { locale } = params;

  if (!locales.includes(locale)) notFound();

  const messages = await getMessages();

  return (
    <html
      lang={locale}
      className={`${cormorant.variable} ${playfair.variable} ${inter.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen bg-hotel-bg text-hotel-text antialiased">
        <JsonLd data={hotelSchema(locale)} />
        <a href="#main-content" className="skip-to-content">
          {locale === 'es' ? 'Ir al contenido principal' : 'Skip to main content'}
        </a>
        <NextIntlClientProvider messages={messages}>
          <Providers>
            <Navbar />
            <main id="main-content">{children}</main>
            <Footer />
          </Providers>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
