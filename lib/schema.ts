import { TESTIMONIALS } from '@/lib/testimonials-data';
import type { Room } from '@/types/room';

const BASE_URL = 'https://casaboutiquesandiego.com';

/** Hotel + LocalBusiness schema — add to root layout */
export function hotelSchema(locale: string): Record<string, unknown> {
  const isEs = locale === 'es';
  return {
    '@context': 'https://schema.org',
    '@type': ['Hotel', 'LodgingBusiness'],
    name: 'Casa Boutique San Diego',
    alternateName: 'Casa Boutique San Diego Cartagena',
    description: isEs
      ? 'Hotel boutique 5 estrellas en el corazón del Centro Histórico de Cartagena. 12 habitaciones únicas en una casa colonial del siglo XVIII. Piscina, spa, restaurante de autor y terraza con vista a la muralla.'
      : 'Luxury 5-star boutique hotel in the heart of Cartagena Historic Center. 12 unique rooms in an 18th-century colonial house. Pool, spa, signature restaurant and rooftop terrace with city wall views.',
    url: BASE_URL,
    telephone: '+573052345678',
    email: 'reservas@casaboutiquesandiego.com',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle de las Bóvedas #39-67',
      addressLocality: 'Cartagena de Indias',
      addressRegion: 'Bolívar',
      postalCode: '130001',
      addressCountry: 'CO',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 10.4296,
      longitude: -75.5496,
    },
    hasMap: 'https://www.google.com/maps/search/?api=1&query=10.4296,-75.5496',
    starRating: {
      '@type': 'Rating',
      ratingValue: '5',
    },
    priceRange: '$$$$',
    currenciesAccepted: 'COP, USD',
    paymentAccepted: isEs ? 'Tarjeta de crédito, Efectivo' : 'Credit card, Cash',
    checkinTime: '15:00',
    checkoutTime: '12:00',
    numberOfRooms: 12,
    petsAllowed: false,
    image: [
      'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80',
      'https://images.unsplash.com/photo-1564501049412-61c2a3083791?w=1200&q=80',
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=1200&q=80',
    ],
    logo: {
      '@type': 'ImageObject',
      url: `${BASE_URL}/logo.png`,
    },
    amenityFeature: [
      { '@type': 'LocationFeatureSpecification', name: isEs ? 'Piscina' : 'Pool', value: true },
      { '@type': 'LocationFeatureSpecification', name: isEs ? 'Spa' : 'Spa', value: true },
      { '@type': 'LocationFeatureSpecification', name: isEs ? 'Restaurante de autor' : 'Signature restaurant', value: true },
      { '@type': 'LocationFeatureSpecification', name: isEs ? 'Terraza con bar' : 'Rooftop bar', value: true },
      { '@type': 'LocationFeatureSpecification', name: 'WiFi', value: true },
      { '@type': 'LocationFeatureSpecification', name: isEs ? 'Aire acondicionado' : 'Air conditioning', value: true },
      { '@type': 'LocationFeatureSpecification', name: isEs ? 'Conserjería 24 horas' : '24-hour concierge', value: true },
      { '@type': 'LocationFeatureSpecification', name: isEs ? 'Traslados privados' : 'Private transfers', value: true },
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      reviewCount: TESTIMONIALS.length,
      bestRating: '5',
      worstRating: '1',
    },
    review: TESTIMONIALS.map((t) => ({
      '@type': 'Review',
      reviewRating: {
        '@type': 'Rating',
        ratingValue: String(t.rating),
        bestRating: '5',
      },
      author: {
        '@type': 'Person',
        name: t.name,
      },
      reviewBody: t.text[isEs ? 'es' : 'en'],
      datePublished: t.date,
    })),
    sameAs: [],
  };
}

/** BreadcrumbList schema for interior pages */
export function breadcrumbSchema(
  items: { name: string; url: string }[]
): Record<string, unknown> {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: `${BASE_URL}${item.url}`,
    })),
  };
}

/** LodgingReservation / Accommodation schema for room detail pages */
export function roomSchema(room: Room, locale: string): Record<string, unknown> {
  const isEs = locale === 'es';
  return {
    '@context': 'https://schema.org',
    '@type': 'HotelRoom',
    name: isEs
      ? { patio: 'Habitación Patio', balcon: 'Habitación Balcón', mirador: 'Suite Mirador' }[room.slug]
      : { patio: 'Patio Room', balcon: 'Balcony Room', mirador: 'Mirador Suite' }[room.slug],
    description: room.description[isEs ? 'es' : 'en'][0],
    url: `${BASE_URL}${isEs ? '' : '/en'}/habitaciones/${room.slug}`,
    image: room.gallery.map((img) => img.url),
    bed: [
      {
        '@type': 'BedDetails',
        numberOfBeds: 1,
        typeOfBed: isEs ? 'Cama king' : 'King bed',
      },
    ],
    occupancy: {
      '@type': 'QuantitativeValue',
      minValue: 1,
      maxValue: room.maxGuests,
    },
    floorSize: {
      '@type': 'QuantitativeValue',
      value: room.sqm,
      unitCode: 'MTK',
    },
    amenityFeature: room.amenities.map((a) => ({
      '@type': 'LocationFeatureSpecification',
      name: a,
      value: true,
    })),
    offers: {
      '@type': 'Offer',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: room.priceUSD,
        priceCurrency: 'USD',
        unitCode: 'DAY',
      },
    },
  };
}

/** Restaurant schema */
export function restaurantSchema(locale: string): Record<string, unknown> {
  const isEs = locale === 'es';
  return {
    '@context': 'https://schema.org',
    '@type': 'Restaurant',
    name: 'El Patio de las Bóvedas',
    description: isEs
      ? 'Cocina caribeña contemporánea con productos locales del Caribe colombiano. Menú degustación de 7 tiempos y carta de autor.'
      : 'Contemporary Caribbean cuisine with local Colombian Caribbean produce. 7-course tasting menu and signature à la carte.',
    url: `${BASE_URL}${isEs ? '' : '/en'}/restaurante`,
    telephone: '+573052345678',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'Calle de las Bóvedas #39-67',
      addressLocality: 'Cartagena de Indias',
      addressCountry: 'CO',
    },
    servesCuisine: isEs ? 'Cocina caribeña colombiana' : 'Colombian Caribbean cuisine',
    priceRange: '$$$',
    openingHoursSpecification: [
      {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '07:00',
        closes: '22:30',
      },
    ],
    hasMenu: `${BASE_URL}${isEs ? '' : '/en'}/restaurante`,
    acceptsReservations: true,
    image: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
  };
}
