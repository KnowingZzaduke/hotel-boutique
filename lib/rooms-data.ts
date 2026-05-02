import type { Room } from '@/types/room';

export const ROOMS: Room[] = [
  {
    slug: 'patio',
    priceCOP: 850000,
    priceUSD: 210,
    sqm: 30,
    maxGuests: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=900&q=85&auto=format&fit=crop',
    imageAlt: {
      es: 'Habitación colonial con vista al patio interior lleno de vegetación tropical',
      en: 'Colonial room with view of the tropical interior courtyard',
    },
    amenities: ['A/C', 'Tina', 'WiFi', 'Minibar'],
  },
  {
    slug: 'balcon',
    priceCOP: 1200000,
    priceUSD: 295,
    sqm: 40,
    maxGuests: 2,
    imageUrl:
      'https://images.unsplash.com/photo-1618773928121-c32242e63f39?w=900&q=85&auto=format&fit=crop',
    imageAlt: {
      es: 'Habitación con balcón privado sobre la calle empedrada colonial',
      en: 'Room with private balcony overlooking the cobblestone colonial street',
    },
    amenities: ['A/C', 'Tina', 'WiFi', 'Minibar', 'Balcón', 'Nespresso'],
  },
  {
    slug: 'mirador',
    priceCOP: 1950000,
    priceUSD: 480,
    sqm: 65,
    maxGuests: 3,
    imageUrl:
      'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=900&q=85&auto=format&fit=crop',
    imageAlt: {
      es: 'Suite Mirador con terraza privada y vistas panorámicas de la ciudad amurallada',
      en: 'Mirador Suite with private terrace and panoramic views of the walled city',
    },
    amenities: ['A/C', 'Tina', 'WiFi', 'Minibar', 'Terraza', 'Jacuzzi', 'Mayordomo'],
  },
];

export function formatPriceCOP(price: number): string {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(price);
}
